import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        navigate("/auth");
        return;
      }
      
      setUser(data.session.user);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single();
        
      if (profileError) {
        console.error("Error fetching profile:", profileError);
        toast({
          title: "Error fetching profile",
          description: profileError.message,
          variant: "destructive",
        });
      } else if (profileData) {
        setProfile(profileData);
        form.reset({
          firstName: profileData.first_name || "",
          lastName: profileData.last_name || "",
        });
      }
      
      setLoading(false);
    };
    
    checkSession();
  }, [navigate, toast, form]);

  const onSubmit = async (values: any) => {
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      toast({
        title: "Profile updated successfully",
      });
      
      // Refresh profile data
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
        
      setProfile(data);
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={handleBack} className="mr-4">
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
        </div>
        
        <div className="bg-card rounded-xl shadow-md p-6 text-card-foreground border border-border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-8 pt-6 border-t border-border">
            <h2 className="text-lg font-medium mb-4 text-foreground">Account Information</h2>
            <div className="space-y-3">
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Account Created</Label>
                <p className="text-muted-foreground">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
