import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { BlogPost } from "@shared/schema"
import { Button } from "./button"
import { Link } from "wouter"
import { ArrowRight, Newspaper } from "lucide-react"

interface BlogAccordionProps {
  articles: Partial<BlogPost>[]
  className?: string
}

const BlogAccordion = ({ articles, className }: BlogAccordionProps) => {
  const formatDate = (date?: string | Date) => {
    if (!date) return ""
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className={className}>
      <div className="flex items-center mb-4">
        <Newspaper className="w-6 h-6 mr-3 text-accent-orange" />
        <h2 className="text-2xl font-bold text-text-primary">
          Полезные статьи по теме
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {articles.map((article, index) => (
          <AccordionItem value={`item-${index}`} key={article.slug}>
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              {article.title}
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <p className="text-text-secondary mb-4">{article.excerpt}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-text-secondary">
                  <span>{article.author}</span> ·{" "}
                  <span>{formatDate(article.createdAt)}</span>
                </div>
                <Link href={`/blog/${article.slug}`}>
                  <Button variant="ghost" className="text-accent-orange hover:text-accent-orange">
                    Читать далее <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default BlogAccordion 