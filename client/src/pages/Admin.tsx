/*
 * Painel de Administração — Ted Animações
 * Permite ao administrador gerir todas as fotos do site:
 * - Ver fotos por secção
 * - Fazer upload de novas fotos
 * - Remover fotos
 * - Ativar/desativar fotos
 * - Editar legendas
 */

import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useState, useRef } from "react";
import { toast } from "sonner";

const SECTIONS = [
  { value: "galeria", label: "Galeria" },
  { value: "carrossel", label: "Carrossel" },
  { value: "hero", label: "Hero" },
  { value: "atividades", label: "Atividades" },
] as const;

type Section = (typeof SECTIONS)[number]["value"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("galeria");
  const [uploadSection, setUploadSection] = useState<Section>("galeria");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editingCaption, setEditingCaption] = useState<number | null>(null);
  const [editCaptionValue, setEditCaptionValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();

  const { data: photos, isLoading } = trpc.photos.adminListAll.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const uploadMutation = trpc.photos.upload.useMutation({
    onSuccess: () => {
      utils.photos.adminListAll.invalidate();
      utils.photos.listAll.invalidate();
      toast.success("Foto carregada com sucesso!");
      setCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: (err) => toast.error(`Erro ao carregar: ${err.message}`),
  });

  const deleteMutation = trpc.photos.delete.useMutation({
    onSuccess: () => {
      utils.photos.adminListAll.invalidate();
      utils.photos.listAll.invalidate();
      toast.success("Foto removida.");
    },
    onError: (err) => toast.error(`Erro ao remover: ${err.message}`),
  });

  const toggleMutation = trpc.photos.toggleActive.useMutation({
    onSuccess: () => {
      utils.photos.adminListAll.invalidate();
      utils.photos.listAll.invalidate();
    },
    onError: (err) => toast.error(`Erro: ${err.message}`),
  });

  const captionMutation = trpc.photos.updateCaption.useMutation({
    onSuccess: () => {
      utils.photos.adminListAll.invalidate();
      setEditingCaption(null);
      toast.success("Legenda atualizada.");
    },
    onError: (err) => toast.error(`Erro: ${err.message}`),
  });

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF0DC", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "'Nunito',sans-serif", color: "#3a5a54", fontSize: "1.1rem" }}>A carregar...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF0DC", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem" }}>
        <p style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.5rem", color: "#1a2e2a" }}>Acesso restrito</p>
        <a href={getLoginUrl()} style={{ background: "#2D7A6E", color: "#FAF0DC", padding: "0.8rem 2rem", borderRadius: "9999px", fontFamily: "'Nunito',sans-serif", fontWeight: 700, textDecoration: "none" }}>
          Iniciar sessão
        </a>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF0DC", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <p style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.5rem", color: "#1a2e2a" }}>Sem permissão</p>
        <p style={{ fontFamily: "'Nunito',sans-serif", color: "#3a5a54" }}>Esta área é apenas para administradores.</p>
        <a href="/" style={{ color: "#2D7A6E", fontFamily: "'Nunito',sans-serif", fontWeight: 700 }}>Voltar ao site</a>
      </div>
    );
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) return toast.error("Selecione uma imagem.");
    if (file.size > 16 * 1024 * 1024) return toast.error("A imagem não pode ter mais de 16MB.");

    setUploading(true);
    try {
      const dataBase64 = await fileToBase64(file);
      await uploadMutation.mutateAsync({
        filename: file.name,
        contentType: file.type,
        dataBase64,
        section: uploadSection,
        caption: caption || undefined,
        displayOrder: 0,
      });
    } finally {
      setUploading(false);
    }
  };

  const filteredPhotos = photos?.filter(p => p.section === activeSection) ?? [];

  return (
    <div style={{ minHeight: "100vh", background: "#FAF0DC" }}>
      {/* Header */}
      <div style={{ background: "#1a2e2a", padding: "1.2rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663246028015/cEcMzfjKA6ntjeRSGovnMS/ted-logo_d9f03a52.png" alt="Ted" style={{ width: "2.5rem", height: "2.5rem", objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.1rem", color: "#FAF0DC" }}>Ted Animações</div>
            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.75rem", color: "#7BC67E" }}>Painel de Administração</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.85rem", color: "#a0b8b4" }}>{user.name}</span>
          <a href="/" style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.85rem", color: "#F5C842", textDecoration: "none", fontWeight: 700 }}>Ver site</a>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Upload de nova foto */}
        <div style={{ background: "#fff", borderRadius: "2rem", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 24px rgba(45,122,110,0.10)" }}>
          <h2 style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: "1.4rem", color: "#1a2e2a", marginBottom: "1.5rem" }}>
            Adicionar nova foto
          </h2>
          <form onSubmit={handleUpload} style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flex: "1 1 200px" }}>
              <label style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#3a5a54" }}>Imagem</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                required
                style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.9rem", padding: "0.5rem", border: "2px solid #E0D4B0", borderRadius: "0.75rem", background: "#FAF0DC" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flex: "1 1 160px" }}>
              <label style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#3a5a54" }}>Secção</label>
              <select
                value={uploadSection}
                onChange={e => setUploadSection(e.target.value as Section)}
                style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.9rem", padding: "0.6rem 0.8rem", border: "2px solid #E0D4B0", borderRadius: "0.75rem", background: "#FAF0DC", color: "#1a2e2a" }}
              >
                {SECTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flex: "2 1 240px" }}>
              <label style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#3a5a54" }}>Legenda (opcional)</label>
              <input
                type="text"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Ex: Festa de aniversário em Faro"
                style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.9rem", padding: "0.6rem 0.8rem", border: "2px solid #E0D4B0", borderRadius: "0.75rem", background: "#FAF0DC", color: "#1a2e2a" }}
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              style={{ background: uploading ? "#a0b8b4" : "#2D7A6E", color: "#FAF0DC", border: "none", borderRadius: "9999px", padding: "0.75rem 2rem", fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: "1rem", cursor: uploading ? "not-allowed" : "pointer", flexShrink: 0 }}
            >
              {uploading ? "A carregar..." : "Adicionar foto"}
            </button>
          </form>
        </div>

        {/* Filtro por secção */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {SECTIONS.map(s => (
            <button
              key={s.value}
              onClick={() => setActiveSection(s.value)}
              style={{
                background: activeSection === s.value ? "#2D7A6E" : "#fff",
                color: activeSection === s.value ? "#FAF0DC" : "#3a5a54",
                border: `2px solid ${activeSection === s.value ? "#2D7A6E" : "#E0D4B0"}`,
                borderRadius: "9999px",
                padding: "0.5rem 1.4rem",
                fontFamily: "'Baloo 2',cursive",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {s.label}
              <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem", opacity: 0.7 }}>
                ({photos?.filter(p => p.section === s.value).length ?? 0})
              </span>
            </button>
          ))}
        </div>

        {/* Grelha de fotos */}
        {isLoading ? (
          <p style={{ fontFamily: "'Nunito',sans-serif", color: "#3a5a54" }}>A carregar fotos...</p>
        ) : filteredPhotos.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "2rem", padding: "3rem", textAlign: "center", boxShadow: "0 4px 24px rgba(45,122,110,0.08)" }}>
            <p style={{ fontFamily: "'Nunito',sans-serif", color: "#a0b8b4", fontSize: "1rem" }}>
              Nenhuma foto na secção "{SECTIONS.find(s => s.value === activeSection)?.label}". Adicione a primeira foto acima.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {filteredPhotos.map(photo => (
              <div
                key={photo.id}
                style={{
                  background: "#fff",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(45,122,110,0.10)",
                  opacity: photo.active ? 1 : 0.55,
                  border: photo.active ? "2px solid transparent" : "2px dashed #E0D4B0",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img
                    src={photo.url}
                    alt={photo.caption ?? "Foto Ted Animações"}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {!photo.active && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: "#FAF0DC", fontSize: "0.9rem", background: "rgba(0,0,0,0.5)", padding: "0.3rem 0.8rem", borderRadius: "9999px" }}>Inativa</span>
                    </div>
                  )}
                </div>

                <div style={{ padding: "1rem" }}>
                  {/* Legenda */}
                  {editingCaption === photo.id ? (
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <input
                        value={editCaptionValue}
                        onChange={e => setEditCaptionValue(e.target.value)}
                        style={{ flex: 1, fontFamily: "'Nunito',sans-serif", fontSize: "0.85rem", padding: "0.4rem 0.6rem", border: "2px solid #2D7A6E", borderRadius: "0.5rem" }}
                        autoFocus
                      />
                      <button
                        onClick={() => captionMutation.mutate({ id: photo.id, caption: editCaptionValue })}
                        style={{ background: "#2D7A6E", color: "#FAF0DC", border: "none", borderRadius: "0.5rem", padding: "0.4rem 0.8rem", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.8rem" }}
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingCaption(null)}
                        style={{ background: "#E0D4B0", color: "#3a5a54", border: "none", borderRadius: "0.5rem", padding: "0.4rem 0.6rem", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.8rem" }}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <p
                      onClick={() => { setEditingCaption(photo.id); setEditCaptionValue(photo.caption ?? ""); }}
                      style={{ fontFamily: "'Nunito',sans-serif", fontSize: "0.85rem", color: photo.caption ? "#3a5a54" : "#a0b8b4", marginBottom: "0.75rem", cursor: "pointer", minHeight: "1.2rem" }}
                      title="Clique para editar a legenda"
                    >
                      {photo.caption || "Sem legenda — clique para adicionar"}
                    </p>
                  )}

                  {/* Ações */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => toggleMutation.mutate({ id: photo.id, active: !photo.active })}
                      style={{
                        flex: 1,
                        background: photo.active ? "#F0E4C4" : "#2D7A6E",
                        color: photo.active ? "#3a5a54" : "#FAF0DC",
                        border: "none",
                        borderRadius: "0.75rem",
                        padding: "0.5rem",
                        fontFamily: "'Nunito',sans-serif",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      {photo.active ? "Desativar" : "Ativar"}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Tem a certeza que quer remover esta foto?")) {
                          deleteMutation.mutate({ id: photo.id });
                        }
                      }}
                      style={{
                        background: "#fee2e2",
                        color: "#dc2626",
                        border: "none",
                        borderRadius: "0.75rem",
                        padding: "0.5rem 0.8rem",
                        fontFamily: "'Nunito',sans-serif",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
