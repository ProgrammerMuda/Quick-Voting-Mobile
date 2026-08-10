import React from 'react';
import { Box, Card, Typography, Grid } from '@mui/material';
import { ChartBar, Trophy, Lightning, Users, ShieldCheck, TrendUp } from '@phosphor-icons/react';
import { prelineColors } from '../theme/theme';

export default function StatsOverview({ polls = [] }) {
  const totalVotesCast = polls.reduce(
    (acc, poll) => acc + poll.options.reduce((oAcc, opt) => oAcc + opt.votes, 0),
    0
  );
  const activePollsCount = polls.filter((p) => !p.isClosed).length;

  const stats = [
    {
      title: 'Total Suara',
      value: totalVotesCast.toLocaleString(),
      change: '+14% minggu ini',
      icon: <Users size={22} color="#27b29b" weight="fill" />,
      bg: 'rgba(39, 178, 155, 0.1)',
    },
    {
      title: 'Pemungutan Aktif',
      value: activePollsCount.toString(),
      change: '2 Segera Berakhir',
      icon: <Lightning size={22} color={prelineColors.accent.amber} weight="fill" />,
      bg: 'rgba(245, 158, 11, 0.1)',
    },
    {
      title: 'Tingkat Partisipasi',
      value: '87.4%',
      change: '+3.2% vs bulan lalu',
      icon: <TrendUp size={22} color={prelineColors.accent.emerald} weight="fill" />,
      bg: 'rgba(16, 185, 129, 0.1)',
    },
    {
      title: 'Sistem Keamanan',
      value: 'Tervikasi',
      change: 'Enkripsi End-to-End',
      icon: <ShieldCheck size={22} color={prelineColors.accent.indigo} weight="fill" />,
      bg: 'rgba(99, 102, 241, 0.1)',
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 700, color: prelineColors.slate[900] }}>
          Ringkasan Statistik
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Trophy size={16} color="#27b29b" weight="fill" />
          <Typography variant="caption" sx={{ color: '#1e8f7c', fontWeight: 600 }}>
            Real-time Update
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={1.5}>
        {stats.map((stat, idx) => (
          <Grid item xs={6} key={idx}>
            <Card
              sx={{
                p: 1.75,
                backgroundColor: '#ffffff',
                border: `1px solid ${prelineColors.slate[200]}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    backgroundColor: stat.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontWeight: 500, display: 'block' }}>
                  {stat.title}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: prelineColors.slate[900], lineHeight: 1.1, my: 0.25 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: prelineColors.slate[500], fontSize: '0.68rem', fontWeight: 500 }}>
                  {stat.change}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
