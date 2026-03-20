'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, Trash2, Package, Pencil } from 'lucide-react';
import api from '@/lib/axios';
import { supabase } from '@/lib/supabse';

const CATEGORIES = ['pendant', 'ring', 'earring', 'necklace', 'bracelet'];
const MATERIALS = ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold'];
const GEMSTONES = ['Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 'Topaz', 'Amethyst'];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    currency: 'inr',
    inStock: true,
    stockQuantity: '0',
    category: '',
    gemstone: '',
    material: '',
    sizes: [],
    adjustableChain: false,
    additionalInfo: '',
    images: [],
  });

  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState('');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSize = () => {
    if (newSize.trim()) {
      setSizes((prev) => [...prev, { label: newSize, available: true }]);
      setNewSize('');
    }
  };

  const removeSize = (index) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSizeAvailability = (index) => {
    setSizes((prev) =>
      prev.map((size, i) =>
        i === index ? { ...size, available: !size.available } : size
      )
    );
  };

  const removeExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Each image must be less than 2MB');
        return;
      }
    }

    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get(`/products/admin/${id}`);
        const product = res.data.product || res.data;

        setFormData({
          title: product.title || '',
          description: product.description || '',
          price: product.price?.toString() || '',
          originalPrice: product.originalPrice?.toString() || '',
          currency: product.currency || 'inr',
          inStock: product.inStock ?? true,
          stockQuantity: product.stockQuantity?.toString() || '0',
          category: product.category || '',
          gemstone: product.gemstone || '',
          material: product.material || '',
          sizes: product.sizes || [],
          adjustableChain: product.adjustableChain ?? false,
          additionalInfo: product.additionalInfo || '',
          images: product.images || [],
        });

        setSizes(product.sizes || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      let uploadedImageUrls = [];

      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const filePath = `products/${Date.now()}-${file.name}`;

          const { error: uploadError } = await supabase.storage
            .from('jewe')
            .upload(filePath, file);

          if (uploadError) {
            throw new Error(uploadError.message);
          }

          const { data } = supabase.storage
            .from('jewe')
            .getPublicUrl(filePath);

          uploadedImageUrls.push(data.publicUrl);
        }
      }

      const payload = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        stockQuantity: parseInt(formData.stockQuantity),
        sizes,
        images: [...formData.images, ...uploadedImageUrls],
      };

      await api.put(`/products/admin/${id}`, payload);

      setSuccess('Product updated successfully');
      setImageFiles([]);
      setImagePreviews([]);

      setTimeout(() => {
        router.push('/admin/products');
      }, 1000);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading product...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 pb-10">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Pencil className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Edit Product</h1>
                <p className="text-sm text-muted-foreground">Update your jewellery product details</p>
              </div>
            </div>

            <Button variant="outline" onClick={() => router.push('/admin/products')}>
              Back to Products
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Details
            </CardTitle>
            <CardDescription>Edit the fields below and save changes</CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
                  {success}
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Product Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g. Diamond Solitaire Ring"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[110px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Images</h3>

                <div className="space-y-2">
                  <Label>Add More Images</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                </div>

                {formData.images.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Existing Images</p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg border">
                          <img
                            src={img}
                            alt={`product-${index}`}
                            className="h-28 w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {imagePreviews.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">New Upload Preview</p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {imagePreviews.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`preview-${index}`}
                          className="h-28 w-full rounded-lg border object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Jewellery Details</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Material</Label>
                    <Select
                      value={formData.material}
                      onValueChange={(value) => handleInputChange('material', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {MATERIALS.map((mat) => (
                          <SelectItem key={mat} value={mat}>
                            {mat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Gemstone</Label>
                    <Select
                      value={formData.gemstone}
                      onValueChange={(value) => handleInputChange('gemstone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gemstone" />
                      </SelectTrigger>
                      <SelectContent>
                        {GEMSTONES.map((gem) => (
                          <SelectItem key={gem} value={gem}>
                            {gem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center pt-8">
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.adjustableChain}
                        onCheckedChange={(checked) => handleInputChange('adjustableChain', checked)}
                      />
                      Adjustable Chain
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing & Inventory</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Original Price *</Label>
                    <Input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Stock Quantity</Label>
                    <Input
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.inStock}
                    onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                  />
                  <Label>In Stock</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Available Sizes</h3>

                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. 16in, Size 7"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSize();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addSize}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {sizes.length > 0 && (
                  <div className="space-y-2 rounded-lg border bg-muted/20 p-4">
                    {sizes.map((size, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border bg-background p-3"
                      >
                        <span className="font-medium">{size.label}</span>

                        <div className="flex items-center gap-3">
                          <Label className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={size.available}
                              onCheckedChange={() => toggleSizeAvailability(index)}
                            />
                            Available
                          </Label>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSize(index)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="min-h-[90px]"
                  placeholder="Care instructions, certification, etc."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/products')}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {saving ? 'Saving...' : 'Update Product'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}