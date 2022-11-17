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
        {breadcrumbs.map((breadcrumb) => (
          <React.Fragment>
            {breadcrumb.url && (
              <Link component={RouterLink} to={breadcrumb.url}>
                {breadcrumb.title}
              </Link>
            )}
            {!breadcrumb.url && <Typography>{breadcrumb.title}</Typography>}
          </React.Fragment>
        ))}
      </Breadcrumbs>
    )}
    <Typography variant="h4">{title}</Typography>
  </Box>
);

export default PageTitle;
