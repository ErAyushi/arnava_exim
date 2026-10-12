import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Loader2, PackageOpen, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/data/site";

const EMPTY = {
  name: "",
  slug: "",
  category: "",
  tier: "",
  badge: "",
  purity: "",
  image: "",
  alt: "",
  short: "",
  description: "",
  pointsText: "",
  order: 0,
};

const labelCls = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500";
const fieldCls = "h-11 rounded-lg border-slate-200 bg-white focus-visible:ring-emerald-500";

export default function ProductsManager({ authed }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const existingCategories = useMemo(
    () => [...new Set(products.map((p) => (p.category || "").trim()).filter(Boolean))],
    [products]
  );

  const load = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    (async () => {
      try {
        await load();
      } catch (e) {
        toast.error("Could not load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e && e.target ? e.target.value : e }));

  const startNew = () => {
    setForm({ ...EMPTY, order: products.length + 1 });
    setEditing("new");
  };

  const startEdit = (p) => {
    setForm({
      name: p.name,
      slug: p.slug,
      category: p.category || "",
      tier: p.tier || "",
      badge: p.badge || "",
      purity: p.purity || "",
      image: p.image || "",
      alt: p.alt || "",
      short: p.short || "",
      description: p.description || "",
      pointsText: (p.points || []).join("\n"),
      order: p.order || 0,
    });
    setEditing(p.id);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    setSaving(true);
    const body = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      category: form.category.trim(),
      tier: form.tier.trim(),
      badge: form.badge.trim(),
      purity: form.purity.trim(),
      image: form.image.trim(),
      alt: form.alt.trim(),
      short: form.short.trim(),
      description: form.description.trim(),
      points: form.pointsText.split("\n").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };
    try {
      if (editing === "new") {
        await authed(() => axios.post(`${API}/products`, body, { withCredentials: true }));
      } else {
        await authed(() => axios.put(`${API}/products/${editing}`, body, { withCredentials: true }));
      }
      toast.success(editing === "new" ? "Product added to catalogue" : "Product updated");
      setEditing(null);
      await load();
    } catch (err) {
      toast.error("Could not save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.name}" from the catalogue?`)) return;
    try {
      await authed(() => axios.delete(`${API}/products/${p.id}`, { withCredentials: true }));
      toast.success("Product deleted");
      if (editing === p.id) setEditing(null);
      await load();
    } catch (e) {
      toast.error("Could not delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16" data-testid="products-manager-loading">
        <Loader2 className="h-7 w-7 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div data-testid="products-manager">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-navy/5">
        <p className="text-sm text-slate-600">
          <span className="font-bold text-navy" data-testid="products-manager-count">{products.length}</span> products in the storefront catalogue
        </p>
        <button
          onClick={startNew}
          data-testid="product-add-button"
          className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {editing && (
        <form
          onSubmit={save}
          data-testid="product-edit-form"
          className="mt-5 rounded-2xl border border-emerald-300 bg-white p-6 shadow-xl shadow-navy/5"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-navy">
              {editing === "new" ? "Add New Product" : "Edit Product"}
            </h3>
            <button
              type="button"
              onClick={() => setEditing(null)}
              data-testid="product-form-cancel-button"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-navy"
            >
              <X className="h-3.5 w-3.5" /> Cancel
            </button>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Product Name *</label>
              <Input value={form.name} onChange={set("name")} required placeholder="e.g. Moringa Leaf Powder"
                data-testid="product-form-name-input" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>URL Slug (auto if empty)</label>
              <Input value={form.slug} onChange={set("slug")} placeholder="e.g. moringa-leaf-powder"
                data-testid="product-form-slug-input" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Category (filter tab on Products page)</label>
              <Input value={form.category} onChange={set("category")} list="category-suggestions"
                placeholder="e.g. Psyllium Husk or Moringa Powder"
                data-testid="product-form-category-input" className={fieldCls} />
              <datalist id="category-suggestions">
                {existingCategories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className={labelCls}>Tier Label</label>
              <Input value={form.tier} onChange={set("tier")} placeholder="e.g. Prime 99"
                data-testid="product-form-tier-input" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Badge (shown on image)</label>
              <Input value={form.badge} onChange={set("badge")} placeholder="e.g. 99% Purity"
                data-testid="product-form-badge-input" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Purity</label>
              <Input value={form.purity} onChange={set("purity")} placeholder='e.g. 99% or "As per buyer requirement"'
                data-testid="product-form-purity-input" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <Input type="number" value={form.order} onChange={set("order")}
                data-testid="product-form-order-input" className={fieldCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Image URL</label>
              <Input value={form.image} onChange={set("image")} placeholder="https://..."
                data-testid="product-form-image-input" className={fieldCls} />
              {form.image && (
                <img src={form.image} alt="Product preview" data-testid="product-form-image-preview"
                  className="mt-3 h-28 w-44 rounded-lg border border-slate-200 object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  onLoad={(e) => (e.currentTarget.style.display = "block")} />
              )}
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Image Alt Text (SEO)</label>
              <Input value={form.alt} onChange={set("alt")} placeholder="Describe the product image"
                data-testid="product-form-alt-input" className={fieldCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Short Description (card)</label>
              <Input value={form.short} onChange={set("short")} placeholder="One line shown on the product card"
                data-testid="product-form-short-input" className={fieldCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Full Description (detail page)</label>
              <Textarea rows={3} value={form.description} onChange={set("description")}
                data-testid="product-form-description-input"
                className="rounded-lg border-slate-200 bg-white focus-visible:ring-emerald-500" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Key Points (one per line)</label>
              <Textarea rows={3} value={form.pointsText} onChange={set("pointsText")}
                placeholder={"99% high-purity grade\nMesh size as per buyer specification"}
                data-testid="product-form-points-input"
                className="rounded-lg border-slate-200 bg-white focus-visible:ring-emerald-500" />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            data-testid="product-form-save-button"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving..." : "Save Product"}
          </button>
        </form>
      )}

      {products.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white py-16" data-testid="products-manager-empty">
          <PackageOpen className="h-10 w-10 text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">No products yet. Click "Add Product" to build your catalogue.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3" data-testid="admin-products-list">
          {products.map((p) => (
            <div
              key={p.id}
              data-testid={`admin-product-row-${p.slug}`}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
            >
              {p.image ? (
                <img src={p.image} alt={p.alt || p.name} className="h-14 w-20 rounded-lg object-cover" />
              ) : (
                <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100">
                  <PackageOpen className="h-5 w-5 text-slate-300" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-display text-sm font-bold text-navy">{p.name}</h4>
                  {p.badge && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-700">
                      {p.badge}
                    </span>
                  )}
                  {p.category && (
                    <span className="rounded-full bg-navy/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-navy/60">
                      {p.category}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-500">{p.short || p.slug}</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">#{p.order}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(p)}
                  data-testid={`product-edit-button-${p.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => remove(p)}
                  data-testid={`product-delete-button-${p.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
