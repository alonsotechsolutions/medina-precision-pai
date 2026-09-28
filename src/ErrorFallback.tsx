import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";

import { AlertTriangleIcon, HomeIcon, RefreshCwIcon } from "lucide-react";
import { buildPhoneHref, BUSINESS_PHONE_DISPLAY } from "@/lib/site";

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  // When encountering an error in the development mode, rethrow it and don't display the boundary.
  // The parent UI will take care of showing a more helpful dialog.
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangleIcon />
          <AlertTitle>We hit an unexpected error</AlertTitle>
          <AlertDescription>
            Something unexpected happened while loading the site. Please try again or contact us directly if the problem continues.
          </AlertDescription>
        </Alert>
        
        <div className="bg-card border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">Error Details:</h3>
          <pre className="text-xs text-destructive bg-muted/50 p-3 rounded border overflow-auto max-h-32">
            {error.message}
          </pre>
        </div>
        
        <div className="grid gap-3">
          <Button 
            onClick={resetErrorBoundary} 
            className="w-full"
            variant="outline"
          >
            <RefreshCwIcon />
            Try Again
          </Button>
          <Button asChild className="w-full">
            <a href="#/">
              <HomeIcon />
              Return Home
            </a>
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <a href={buildPhoneHref()}>
              Call {BUSINESS_PHONE_DISPLAY}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
