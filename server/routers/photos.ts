import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { Photo } from "../../drizzle/schema";
import {
  deletePhoto,
  getAllPhotos,
  getPhotosBySection,
  insertPhoto,
  togglePhotoActive,
  updatePhotoCaption,
  updatePhotoOrder,
} from "../db";
import { storagePut } from "../storage";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

const sectionEnum = z.enum(["galeria", "carrossel", "hero", "atividades"]);

export const photosRouter = router({
  // Público: listar fotos por secção (para o site público)
  listBySection: publicProcedure
    .input(z.object({ section: sectionEnum }))
    .query(async ({ input }) => {
      const rows = await getPhotosBySection(input.section as Photo["section"]);
      return rows.filter(p => p.active);
    }),

  // Público: listar todas as fotos (para o carrossel e galeria)
  listAll: publicProcedure.query(async () => {
    const rows = await getAllPhotos();
    return rows.filter(p => p.active);
  }),

  // Admin: listar todas as fotos incluindo inativas
  adminListAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem gerir fotos." });
    }
    return getAllPhotos();
  }),

  // Admin: fazer upload de uma foto
  upload: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
        dataBase64: z.string(),
        section: sectionEnum,
        caption: z.string().optional(),
        displayOrder: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem fazer upload de fotos." });
      }

      const ext = input.filename.split(".").pop() ?? "jpg";
      const fileKey = `ted-photos/${input.section}/${nanoid()}.${ext}`;
      const buffer = Buffer.from(input.dataBase64, "base64");

      const { url } = await storagePut(fileKey, buffer, input.contentType);

      await insertPhoto({
        url,
        fileKey,
        section: input.section as Photo["section"],
        caption: input.caption ?? null,
        displayOrder: input.displayOrder ?? 0,
        active: true,
      });

      return { url, fileKey };
    }),

  // Admin: remover foto
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem remover fotos." });
      }
      await deletePhoto(input.id);
      return { success: true };
    }),

  // Admin: atualizar ordem
  updateOrder: protectedProcedure
    .input(z.object({ id: z.number(), displayOrder: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem reordenar fotos." });
      }
      await updatePhotoOrder(input.id, input.displayOrder);
      return { success: true };
    }),

  // Admin: ativar/desativar foto
  toggleActive: protectedProcedure
    .input(z.object({ id: z.number(), active: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem alterar a visibilidade de fotos." });
      }
      await togglePhotoActive(input.id, input.active);
      return { success: true };
    }),

  // Admin: atualizar legenda
  updateCaption: protectedProcedure
    .input(z.object({ id: z.number(), caption: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas administradores podem editar legendas." });
      }
      await updatePhotoCaption(input.id, input.caption);
      return { success: true };
    }),
});
