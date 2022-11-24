import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface PageTitleBreadcrumb {
  title: string;
  url?: string;
}

interface PageTitleProps {
  breadcrumbs?: PageTitleBreadcrumb[];
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ breadcrumbs, title }) => (
  <Box marginBottom={2}>
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
            <Typography key={breadcrumb.title}>{breadcrumb.title}</Typography>
          );
        })}
      </Breadcrumbs>
    )}
    <Typography variant="h4">{title}</Typography>
  </Box>
);

export default PageTitle;
