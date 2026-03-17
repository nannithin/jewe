'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import api from '@/lib/axios';
import { supabase } from '@/lib/supabse';
import useStore from '@/store/useStore';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['pendant', 'ring', 'earring', 'necklace', 'bracelet'];
const MATERIALS = ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold'];
const GEMSTONES = ['Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 'Topaz', 'Amethyst'];



export default function ProductForm() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'inr',
    inStock: true,
    stockQuantity: '0',
    category: '',
    gemstone: '',
    material: '',
    sizes: [],
    adjustableChain: false,
    additionalInfo: '',
  });

  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState('');

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/auth/me");

        if (res.data.user.role !== "admin") {
          setLoading(false)
          router.push("/");
        }
      } catch (error) {
        console.log(error);

        setLoading(false)
        //router.push("/auth/login");
      } finally {
        setLoading(false)
      }
    };

    checkAdmin();
  }, []);

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

  const handleImageChange = (e) => {
    console.log(e);

    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be less than 2MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      let imageUrl = '';

      // 🔥 1. Upload Image to Supabase First
      if (imageFile) {
        const filePath = `products/${Date.now()}-${imageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from('jewe')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const { data } = supabase.storage
          .from('jewe')
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      // 🔥 2. Create Payload
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        stockQuantity: parseInt(formData.stockQuantity),
        sizes: sizes,
        image: imageUrl, // 👈 add image URL here
      };

      const response = await api.post('/products', payload);

      setSuccess(true);

      // Reset
      setFormData({
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
      });

      setSizes([]);
      setImageFile(null);
      setImagePreview(null);

      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }

  };

  if (loading) return <p>Loading...</p>

  return (
    <div className="w-full max-w-4xl mx-auto p-4 pb-20">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
          <CardTitle className="text-3xl text-amber-900">Create New Jewellery</CardTitle>
          <CardDescription className="text-amber-700">
            Add a new piece to your collection
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success Message */}
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                ✓ Product created successfully!
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                ✗ {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-900">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-amber-900 font-medium">
                    Product Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Diamond Solitaire Ring"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-amber-900 font-medium">
                    Image *
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    required
                    className="border-amber-200 focus:border-amber-500 cursor-pointer"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg border"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-amber-900 font-medium">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="border-amber-200 focus:border-amber-500">
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
                <Label htmlFor="description" className="text-amber-900 font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your jewellery piece in detail..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  className="min-h-[100px] border-amber-200 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Jewellery Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-900">Jewellery Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material" className="text-amber-900 font-medium">
                    Material
                  </Label>
                  <Select value={formData.material} onValueChange={(value) => handleInputChange('material', value)}>
                    <SelectTrigger className="border-amber-200 focus:border-amber-500">
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
                  <Label htmlFor="gemstone" className="text-amber-900 font-medium">
                    Gemstone
                  </Label>
                  <Select value={formData.gemstone} onValueChange={(value) => handleInputChange('gemstone', value)}>
                    <SelectTrigger className="border-amber-200 focus:border-amber-500">
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

                <div className="space-y-2">
                  <Label className="text-amber-900 font-medium flex items-center gap-2">
                    <Checkbox
                      checked={formData.adjustableChain}
                      onCheckedChange={(checked) =>
                        handleInputChange('adjustableChain', checked)
                      }
                    />
                    Adjustable Chain
                  </Label>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-900">Pricing & Inventory</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-amber-900 font-medium">
                    Price *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-amber-900 font-medium">
                    Original Price *
                  </Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      handleInputChange("originalPrice", e.target.value)
                    }
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                

                <div className="space-y-2">
                  <Label htmlFor="stockQuantity" className="text-amber-900 font-medium">
                    Stock Quantity
                  </Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  checked={formData.inStock}
                  onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                />
                <Label className="text-amber-900 font-medium cursor-pointer">
                  In Stock
                </Label>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-900">Available Sizes</h3>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Medium, 16in, Size 7"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                    className="border-amber-200 focus:border-amber-500"
                  />
                  <Button
                    type="button"
                    onClick={addSize}
                    variant="outline"
                    className="border-amber-200 hover:bg-amber-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {sizes.length > 0 && (
                  <div className="bg-amber-50 rounded-lg p-4 space-y-2">
                    {sizes.map((size, index) => (
                      <div key={index} className="flex items-center justify-between gap-2 p-2 bg-white rounded border border-amber-100">
                        <span className="font-medium text-amber-900">{size.label}</span>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={size.available}
                            onCheckedChange={() => toggleSizeAvailability(index)}
                          />
                          <span className="text-sm text-amber-700">Available</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSize(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-amber-900">Additional Information</h3>
              <Label htmlFor="additionalInfo" className="text-amber-900 font-medium">
                Care Instructions, Certification, etc.
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Add any additional information about the piece..."
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                className="min-h-[80px] border-amber-200 focus:border-amber-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="bh-auto"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? 'Creating...' : 'Create Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
