import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl?: string;
  title?: string;
}

export default function VideoModal({
  open,
  onOpenChange,
  videoUrl,
  title = "Видео",
}: VideoModalProps) {
  const isLocalVideo =
    videoUrl?.endsWith(".mp4") ||
    videoUrl?.endsWith(".webm") ||
    videoUrl?.endsWith(".ogg");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {videoUrl ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
              {isLocalVideo ? (
                <video
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  controls
                  autoPlay
                  title={title}
                />
              ) : (
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              )}
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Видео не найдено</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
