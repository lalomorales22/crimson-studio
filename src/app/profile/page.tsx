
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserCircle, Edit3, Save, Loader2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Full name is too long"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(250, "Bio is too long").optional(),
  avatarUrl: z.string().url("Invalid URL for avatar").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Demo User",
      email: "demo.user@example.com",
      bio: "Loves coding in NextJS, React, and exploring AI with Genkit!",
      avatarUrl: "https://placehold.co/128x128.png",
    },
  });

  const currentAvatarUrl = watch("avatarUrl");
  const initialFormValues = React.useRef<ProfileFormData | null>(null);

  React.useEffect(() => {
    // Store initial values when component mounts or when editing starts
    if (initialFormValues.current === null || isEditing) {
      initialFormValues.current = watch();
    }
  }, [isEditing, watch]);


  const handleCancelEdit = () => {
    if (initialFormValues.current) {
      reset(initialFormValues.current);
    }
    setIsEditing(false);
  };


  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile data submitted:", data);
    initialFormValues.current = data; // Update initial values to current saved data
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto shadow-crimson border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <UserCircle className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">User Profile</CardTitle>
          </div>
          <CardDescription>
            View and manage your profile information. Click 'Edit Profile' to make changes.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-2 border-primary shadow-md">
                <AvatarImage src={currentAvatarUrl || "https://placehold.co/128x128.png"} alt="User Avatar" data-ai-hint="profile avatar" />
                <AvatarFallback>{watch("fullName")?.substring(0,2).toUpperCase() || 'DU'}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="w-full space-y-1">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    {...register("avatarUrl")}
                    placeholder="https://example.com/avatar.png"
                    className={errors.avatarUrl ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.avatarUrl && <p className="text-sm text-destructive">{errors.avatarUrl.message}</p>}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  disabled={!isEditing}
                  className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={!isEditing}
                  className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                disabled={!isEditing}
                placeholder="Tell us a bit about yourself (max 250 characters)"
                rows={3}
                className={errors.bio ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 pt-6">
            {isEditing ? (
              <>
                <Button type="button" variant="outline" onClick={handleCancelEdit} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                <Edit3 />
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
