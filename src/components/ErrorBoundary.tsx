import React, { ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorBoundaryProps {
    message?: string;
    onReset?: () => void;
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = (): void => {
        this.setState({ hasError: false, error: null });
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <Alert variant="destructive" className="my-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Произошла ошибка</AlertTitle>
                    <AlertDescription className="mt-2">
                        {this.props.message || 'Произошла ошибка при работе с компонентом'}
                        <div className="mt-2">
                            <Button onClick={this.handleReset} variant="outline" size="sm" className="flex items-center gap-2">
                                <RefreshCcw className="h-4 w-4" />
                                Попробовать снова
                            </Button>
                        </div>
                    </AlertDescription>
                </Alert>
            );
        }

        return this.props.children;
    }
}
