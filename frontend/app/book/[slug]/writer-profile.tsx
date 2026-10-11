import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Book } from "@/lib/types";

interface WriterProfileProps {
  book: Book;
}

const WriterProfile = ({ book }: WriterProfileProps) => {
  return (
    <div className="pt-6 mt-6">
      <Separator className="mb-6" />
      <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide">
        About the Writer
      </h3>
      <div className="flex items-start gap-4">
        <Avatar size="lg">
          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" />
        </Avatar>
        <div className="flex-1 text-xs">
          <h4 className="font-semibold text-foreground text-sm">
            {book.author}
          </h4>
          <p className="text-muted-foreground mt-1 leading-relaxed max-w-3xl">
            {book.author_bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WriterProfile;
