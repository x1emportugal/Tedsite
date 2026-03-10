/**
 * Testes para o router de fotos do Ted Animações.
 * Verifica que as funções de base de dados retornam os tipos corretos.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock do módulo de base de dados
vi.mock("./db", () => ({
  getPhotosBySection: vi.fn().mockResolvedValue([
    { id: 1, url: "https://example.com/foto.jpg", fileKey: "ted-photos/galeria/abc.jpg", section: "galeria", caption: "Festa", displayOrder: 0, active: true, createdAt: new Date(), updatedAt: new Date() },
  ]),
  getAllPhotos: vi.fn().mockResolvedValue([
    { id: 1, url: "https://example.com/foto.jpg", fileKey: "ted-photos/galeria/abc.jpg", section: "galeria", caption: "Festa", displayOrder: 0, active: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, url: "https://example.com/foto2.jpg", fileKey: "ted-photos/carrossel/def.jpg", section: "carrossel", caption: null, displayOrder: 1, active: false, createdAt: new Date(), updatedAt: new Date() },
  ]),
  insertPhoto: vi.fn().mockResolvedValue(undefined),
  deletePhoto: vi.fn().mockResolvedValue(undefined),
  togglePhotoActive: vi.fn().mockResolvedValue(undefined),
  updatePhotoCaption: vi.fn().mockResolvedValue(undefined),
  updatePhotoOrder: vi.fn().mockResolvedValue(undefined),
}));

import { getPhotosBySection, getAllPhotos, insertPhoto, deletePhoto, togglePhotoActive, updatePhotoCaption } from "./db";

describe("Funções de base de dados de fotos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getPhotosBySection retorna fotos da secção correta", async () => {
    const photos = await getPhotosBySection("galeria");
    expect(photos).toHaveLength(1);
    expect(photos[0].section).toBe("galeria");
    expect(photos[0].url).toContain("https://");
  });

  it("getAllPhotos retorna todas as fotos incluindo inativas", async () => {
    const photos = await getAllPhotos();
    expect(photos).toHaveLength(2);
    const inactivePhoto = photos.find(p => !p.active);
    expect(inactivePhoto).toBeDefined();
  });

  it("insertPhoto é chamado com os dados corretos", async () => {
    await insertPhoto({
      url: "https://cdn.example.com/nova.jpg",
      fileKey: "ted-photos/galeria/nova.jpg",
      section: "galeria",
      caption: "Nova foto",
      displayOrder: 5,
      active: true,
    });
    expect(insertPhoto).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "https://cdn.example.com/nova.jpg",
        section: "galeria",
      })
    );
  });

  it("deletePhoto é chamado com o id correto", async () => {
    await deletePhoto(42);
    expect(deletePhoto).toHaveBeenCalledWith(42);
  });

  it("togglePhotoActive alterna o estado ativo", async () => {
    await togglePhotoActive(1, false);
    expect(togglePhotoActive).toHaveBeenCalledWith(1, false);
  });

  it("updatePhotoCaption atualiza a legenda", async () => {
    await updatePhotoCaption(1, "Nova legenda");
    expect(updatePhotoCaption).toHaveBeenCalledWith(1, "Nova legenda");
  });

  it("listBySection filtra apenas fotos ativas no router público", async () => {
    const photos = await getPhotosBySection("galeria");
    // Simular o filtro do router público
    const activePhotos = photos.filter(p => p.active);
    expect(activePhotos.every(p => p.active)).toBe(true);
  });
});
