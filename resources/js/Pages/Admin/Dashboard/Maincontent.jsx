import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function Maincontent({ count, user, CollectionPoints }) {
    console.log(count);
  const isAdminAccess = user.id === 1;

  const counters = isAdminAccess
    ? [
        { label: 'Total Orders', count: count.order_count, url: route('admin.orders') },
        { label: 'Archive Orders', count: count.order_archive, url: route('admin.archive') },
        { label: 'Total Promo Codes', count: count.promoCode_count, url: route('admin.promo_codes.index') },
        { label: 'Total Collection Points', count: count.collectionPoint_count, url: route('admin.collection_points.index') },
      ]
    : [
        // { label: 'Total Promo Codes', count: count.promoCode_count, url: route('admin.promo_codes.index') },
        { label: 'Total From Client Order', count: CollectionPoints.shippedOrders_count, url: route('admin.ship_orders') },
        { label: 'Total To Client Order', count: CollectionPoints.dropOffOrders_count, url: route('admin.dropoff_orders') },
        { label: 'Last Collection Date', count: CollectionPoints.lastCollectionDate}
      ];

  return (
    <div>
      <Grid container spacing={2}>
        {counters.map((counter, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Link href={counter.url} style={{ textDecoration: 'none' }}>
              <Card sx={{background:index==1? 'blue' : index==2 ? 'yellow' : '#e2e2e2'}}>
                <CardContent>
                  <Typography variant="h6" component="div" color={index==1 ? 'white' : null}>
                    {counter.label}
                  </Typography>
                  <Typography variant="h4" component="div" color={index==1 ? 'white' : null} fontWeight="bold">
                    {counter.count}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
