import * as React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TwoColumnFeatureSectionProps {
  /**
   * Title for the section
   */
  title: string;
  /**
   * Description for the section
   */
  description: string;
  /**
   * Array of feature items for the left column
   */
  features: FeatureItem[];
  /**
   * Image URL for the right column
   */
  imageUrl?: string;
  /**
   * Alternative content for the right column (if no image)
   */
  rightContent?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const TwoColumnFeatureSection: React.FC<TwoColumnFeatureSectionProps> = ({
  title,
  description,
  features,
  imageUrl,
  rightContent,
  className = ""
}) => {
  return (
    <section className={`py-20 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout for Vision section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left column - Content */}
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              {title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {description}
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="minimal-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-accent-orange/10 flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent-orange" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column - Image or custom content */}
          <div className="flex justify-center md:justify-end">
            {imageUrl ? (
              <div className="minimal-card p-4 max-w-md">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            ) : rightContent ? (
              rightContent
            ) : (
              <div className="minimal-card p-8 max-w-md text-center">
                <p className="text-muted-foreground">
                  Добавьте изображение или контент для правой колонки
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnFeatureSection;
