import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { isPro, type Tier } from '@/lib/tier';

interface UpgradeGuardProps {
  tier?: Tier;
  feature: string;
  children: React.ReactNode;
}

export function UpgradeGuard({ tier, feature, children }: UpgradeGuardProps) {
  if (isPro(tier)) {
    // If user has Pro access, render children normally (remove disabled state if present)
    return (
      <div className="inline-block">
        {React.cloneElement(children as React.ReactElement, { disabled: false })}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-block">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Pro feature — Upgrade to unlock {feature}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ProBadge() {
  return (
    <Badge variant="secondary" className="ml-2 text-xs">
      Pro
    </Badge>
  );
}
