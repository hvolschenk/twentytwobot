import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface PageTitleBreadcrumb {
  title: string;
  url?: string;
}

interface PageTitleProps {
  actions?: React.ReactNode;
  breadcrumbs?: PageTitleBreadcrumb[];
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  actions,
  breadcrumbs,
  title,
}) => (
  <Box marginBottom={2}>
    <Grid container spacing={2}>
      <Grid item xs>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs>
            {breadcrumbs.map((breadcrumb) => {
              if (breadcrumb.url) {
                return (
                  <Link
                    component={RouterLink}
                    key={breadcrumb.url}
                    to={breadcrumb.url}
                  >
                    {breadcrumb.title}
                  </Link>
                );
              }
              return (
                <Typography key={breadcrumb.title}>
                  {breadcrumb.title}
                </Typography>
              );
            })}
          </Breadcrumbs>
        )}
      </Grid>
      {actions && (
        <Grid item xs="auto">
          {actions}
        </Grid>
      )}
    </Grid>
    <Typography variant="h4">{title}</Typography>
  </Box>
);

export default PageTitle;
