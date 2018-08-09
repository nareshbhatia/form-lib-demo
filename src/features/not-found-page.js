import React from 'react';
import Typography from '@material-ui/core/Typography';
import { PageLayout, ScrollingContainer } from '../components';

export function NotFoundPage() {
    return (
        <PageLayout>
            <ScrollingContainer>
                <Typography variant="title">Page Not Found</Typography>
            </ScrollingContainer>
        </PageLayout>
    );
}
