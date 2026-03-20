'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2, Search, Plus, Package, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function AdminDashboard() {
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const query = [];

            if (searchTerm.trim()) {
                query.push(`search=${encodeURIComponent(searchTerm.trim())}`);
            }

            if (categoryFilter.trim()) {
                query.push(`category=${encodeURIComponent(categoryFilter.trim())}`);
            }

            const queryString = query.length ? `?${query.join('&')}` : '';

            const response = await api.get(`/products${queryString}`);
            const data = response.data;

            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts();
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm, categoryFilter]);

    const handleDeleteProduct = async (productId) => {
        try {
            setDeletingId(productId);

            await api.delete(`/products/admin/${productId}`);

            const updatedProducts = products.filter((p) => p._id !== productId);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const categories = Array.from(new Set(products.map((p) => p.category)));
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
            <div className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Package className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Jewelry Store</h1>
                                <p className="text-sm text-muted-foreground">Admin Product Management</p>
                            </div>
                        </div>

                        <Button
                            className="w-full gap-2 sm:w-auto"
                            onClick={() => router.push('/createproduct')}
                        >
                            <Plus className="h-4 w-4" />
                            Add New Product
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-border">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Products</p>
                                <p className="mt-2 text-2xl font-bold">{products.length}</p>
                            </div>
                            <div className="rounded-lg bg-primary/10 p-3">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-border">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Categories</p>
                                <p className="mt-2 text-2xl font-bold">{categories.length}</p>
                            </div>
                            <div className="rounded-lg bg-secondary/10 p-3">
                                <Package className="h-5 w-5 text-secondary" />
                            </div>
                        </div>
                    </Card>

                    
                </div>

                <Card className="mb-8 border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by product name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-background/50 pl-10"
                            />
                        </div>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="rounded-md border border-input bg-background/50 px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>
                </Card>

                <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-muted-foreground">Loading products...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-4 py-12">
                            <Package className="mb-3 h-12 w-12 text-muted-foreground/50" />
                            <p className="text-muted-foreground">No products found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-border/50 bg-muted/20">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                            Product Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                            Date Added
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-border/30">
                                    {filteredProducts.map((product) => (
                                        <tr key={product._id} className="transition-colors hover:bg-muted/10">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {product.images?.[0] ? (
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.title}
                                                            className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                                                            <Package className="h-5 w-5 text-primary" />
                                                        </div>
                                                    )}

                                                    <div>
                                                        <p className="line-clamp-1 text-sm font-medium">
                                                            {product.title}
                                                        </p>
                                                        {product.description && (
                                                            <p className="line-clamp-1 text-xs text-muted-foreground">
                                                                {product.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant="secondary"
                                                    className="border-secondary/30 bg-secondary/20 text-secondary-foreground"
                                                >
                                                    {product.category}
                                                </Badge>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-semibold text-foreground">
                                                        ₹{product.price.toFixed(2)}
                                                    </span>
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <span className="text-xs text-muted-foreground line-through">
                                                            ₹{product.originalPrice.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(product.createdAt).toLocaleDateString()}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>

                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete "{product.title}"? This action
                                                                    cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>

                                                            <div className="flex justify-end gap-3">
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDeleteProduct(product._id)}
                                                                    disabled={deletingId === product._id}
                                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                >
                                                                    {deletingId === product._id ? 'Deleting...' : 'Delete'}
                                                                </AlertDialogAction>
                                                            </div>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}