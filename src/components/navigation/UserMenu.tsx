
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserMenuProps {
  user: User;
  language: string;
  isScrolled: boolean;
}

export const UserMenu = ({ user, language, isScrolled }: UserMenuProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(language === 'en' ? 'Successfully logged out' : 'सफलतापूर्वक लॉग आउट हो गया');
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(language === 'en' ? 'Failed to logout' : 'लॉगआउट विफल');
    }
  };
  
  // Get username from user metadata
  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Profile';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`
            flex items-center gap-1 rounded-full border-2
            transition-all duration-400 ease-in-out
            hover:tracking-[4px]
            ${isScrolled 
              ? "border-temple-gold bg-white text-temple-maroon hover:bg-temple-gold/10" 
              : "border-white/20 bg-white/10 text-white hover:bg-white/20"
            }
          `}
        >
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="text-gray-500">
          {language === 'en' ? 'Signed in as' : 'इस रूप में साइन इन'}
        </DropdownMenuItem>
        <DropdownMenuItem className="font-medium">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-500 hover:text-red-600 cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Logout' : 'लॉग आउट'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
