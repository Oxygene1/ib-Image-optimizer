import * as React from 'react';
export default function dynamic(importFunc: any, options: any = {}) {
  const LoadingComponent = options.loading || (() => null);
  
  return function DynamicComponent(props: any) {
    const [Component, setComponent] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
      let mounted = true;
      
      importFunc()
        .then((mod: any) => {
          if (mounted) {
            setComponent(() => mod.default || mod);
            setLoading(false);
          }
        })
        .catch((err: any) => {
          console.error('Error loading dynamic component:', err);
          if (mounted) {
            setLoading(false);
          }
        });
      
      return () => {
        mounted = false;
      };
    }, []);
    
    if (loading || !Component) {
      return <LoadingComponent />;
    }
    
    return <Component {...props} />;
  };
}