import { Twitter, Instagram, Youtube, Github, Linkedin, Mail, Globe, Music2 } from "lucide-react";
import type { SocialItem } from "@/lib/store";

const map = {
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
  tiktok: Music2,
  email: Mail,
  website: Globe,
};

export function SocialIcon({ platform, className = "h-5 w-5" }: { platform: SocialItem["platform"]; className?: string }) {
  const Icon = map[platform] ?? Globe;
  return <Icon className={className} />;
}
