import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Book } from "@/lib/types";

interface BookSpecsAccordionProps {
  book: Book;
}

const BookSpecsAccordion = ({ book }: BookSpecsAccordionProps) => {
  return (
    <Accordion defaultValue={["specs"]} className="w-full space-y-2">
      <AccordionItem value="specs">
        <AccordionTrigger>Book Specifications & Metadata</AccordionTrigger>
        <AccordionContent className="text-xs text-muted-foreground space-y-2">
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <div>
              <span className="font-medium text-foreground">Publisher:</span>{" "}
              {book.publisher}
            </div>
            <div>
              <span className="font-medium text-foreground">Format:</span>{" "}
              {book.format}
            </div>
            <div>
              <span className="font-medium text-foreground">Language:</span>{" "}
              {book.language}
            </div>
            <div>
              <span className="font-medium text-foreground">Rating:</span>{" "}
              {book.rating} / 5
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="delivery">
        <AccordionTrigger>Shipping & Delivery Policy</AccordionTrigger>
        <AccordionContent className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
          <p>
            Estimated delivery:{" "}
            <strong className="text-foreground">
              {book.delivery_estimate}
            </strong>
            .
          </p>
          <p>
            Orders are packaged in eco-friendly protective packaging. Standard
            shipping is complimentary for all bookstore orders.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="returns">
        <AccordionTrigger>Returns & Replacement Guarantee</AccordionTrigger>
        <AccordionContent className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
          <p>
            30-day no-questions-asked return policy. If you receive a damaged or
            misprinted copy, contact customer support for an instant
            replacement.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BookSpecsAccordion;
