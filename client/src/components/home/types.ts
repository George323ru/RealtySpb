export type UserIntent = 'buy' | 'sell' | 'rent' | 'service';

export interface BridgeTextConfig {
  'experts-to-objects': Record<UserIntent, string>;
  'objects-to-services': Record<UserIntent, string>;
  'services-to-process': Record<UserIntent, string>;
}

export interface CTAContent {
  title: string;
  description: string;
}

export interface ActionButtonProps {
  text: string;
  link: string;
} 