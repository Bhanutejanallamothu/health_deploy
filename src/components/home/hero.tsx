import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight drop-shadow-lg">
          Medical Camp
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-md">
          Providing vital community healthcare support where it's needed most.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105">
            <Link href="/register">Register Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
