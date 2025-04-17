
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { isUserAdmin } from '@/lib/supabase-helpers';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Home, Image, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }

      try {
        const adminStatus = await isUserAdmin(user.id);
        console.log('Admin status:', adminStatus);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-2/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (!user || isAdmin === false) {
    toast({
      title: "Access Denied",
      description: "You need admin privileges to access this area.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 border-r pb-12 fixed inset-y-0">
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
              Admin Panel
            </h2>
          </div>
          <div className="px-4">
            <div className="space-y-1">
              <Link to="/admin">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/admin/darshan">
                <Button variant="ghost" className="w-full justify-start">
                  <Image className="mr-2 h-4 w-4" />
                  Darshan Images
                </Button>
              </Link>
              <Link to="/admin/notices">
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notice Board
                </Button>
              </Link>
              <Link to="/admin/gallery">
                <Button variant="ghost" className="w-full justify-start">
                  <Image className="mr-2 h-4 w-4" />
                  Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-4 absolute bottom-4 left-0 right-0">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <div className="mt-2 px-2 text-xs text-muted-foreground">
            Logged in as Admin
          </div>
        </div>
      </Sidebar>
      <div className="flex-1 pl-64">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
