import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';


const fetchNiftyData = async () => {
  try {
    const response = await fetch(
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NIFTY50&apikey=${process.env.NEXT_PUBLIC_NIFTY50_API_KEY}'
    );
    const data = await response.json();

    const niftyPrice = data['Global Quote']['05. price'];
    const changePercent = data['Global Quote']['10. change percent'];


    return [niftyPrice, changePercent];

  } catch (error) {
    console.error('Failed to fetch Nifty 50 data:', error);
    return ['0', '0'];
  }
  
};


export default function MainGrid() {
  // const [niftyPrice, setNiftyPrice] = React.useState('0');
  // const [changePercent, setChangePercent] = React.useState('0');
  const [data, setData] = React.useState<StatCardProps[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const [price, percent] = await fetchNiftyData();
      // setNiftyPrice(price);
      // setChangePercent(percent);

      const updatedData: StatCardProps[] = [
        {
          title: 'Nifty50',
          value: price,
          interval: 'Last 30 days',
          trend: parseFloat(percent) > 0 ? 'up' : 'down',
          data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
            360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
          ],
        },
        {
          title: 'Current Savings',
          value: '325',
          interval: 'All Time',
          trend: 'up',
          data: [
            1640, 1250, 0, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
            780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
          ],
        },
        {
          title: 'Event count',
          value: '200k',
          interval: 'Last 30 days',
          trend: 'neutral',
          data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
            520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
          ],
        },
      ];

      setData(updatedData);
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}


  
// export default function MainGrid() {
//   return (
//     <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
//       {/* cards */}
//       <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
//         Overview
//       </Typography>
//       <Grid
//         container
//         spacing={2}
//         columns={12}
//         sx={{ mb: (theme) => theme.spacing(2) }}
//       >
//         {data.map((card, index) => (
//           <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
//             <StatCard {...card} />
//           </Grid>
//         ))}
//         <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//           <HighlightedCard />
//         </Grid>
//         <Grid size={{ xs: 12, md: 6 }}>
//           <SessionsChart />
//         </Grid>
//         <Grid size={{ xs: 12, md: 6 }}>
//           <PageViewsBarChart />
//         </Grid>
//       </Grid>
//       <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
//         Details
//       </Typography>
//       <Grid container spacing={2} columns={12}>
//         <Grid size={{ xs: 12, lg: 9 }}>
//           <CustomizedDataGrid />
//         </Grid>
//         <Grid size={{ xs: 12, lg: 3 }}>
//           <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
//             <CustomizedTreeView />
//             <ChartUserByCountry />
//           </Stack>
//         </Grid>
//       </Grid>
//       <Copyright sx={{ my: 4 }} />
//     </Box>
//   );
// }
