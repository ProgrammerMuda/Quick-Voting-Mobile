import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Chip,
  MenuItem,
} from '@mui/material';
import { X, Plus, Trash, Sparkle, Tag } from '@phosphor-icons/react';
import { prelineColors } from '../theme/theme';

const CATEGORIES = ['Organisasi', 'Teknologi', 'Komunitas', 'Desain', 'Umum'];

export default function CreatePollModal({ open, onClose, onCreatePoll }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Organisasi');
  const [options, setOptions] = useState(['', '']);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, idx) => idx !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || options.some((opt) => !opt.trim())) return;

    const newPoll = {
      id: `poll-${Date.now()}`,
      title,
      description,
      category,
      timeLeft: '24 Jam lagi',
      isClosed: false,
      userVotedOptionId: null,
      options: options.map((opt, idx) => ({
        id: `opt-${idx + 1}`,
        text: opt,
        votes: 0,
      })),
    };

    onCreatePoll(newPoll);
    setTitle('');
    setDescription('');
    setOptions(['', '']);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: '24px',
          p: 1,
          backgroundColor: '#ffffff',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Sparkle size={20} color="#27b29b" weight="fill" />
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 700, color: prelineColors.slate[900] }}>
            Buat Pemungutan Suara
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: prelineColors.slate[500] }}>
          <X size={18} weight="bold" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Judul Polling"
            placeholder="Contoh: Pemilihan Ketua Panitia 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            size="small"
          />

          <TextField
            label="Kategori"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            size="small"
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Deskripsi Singkat"
            placeholder="Jelaskan secara singkat mengenai polling ini..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={2}
            fullWidth
            size="small"
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: prelineColors.slate[700], fontWeight: 600 }}>
              Pilihan Suara (Min 2, Max 5)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {options.map((option, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    placeholder={`Pilihan ${idx + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    fullWidth
                    required
                    size="small"
                  />
                  {options.length > 2 && (
                    <IconButton onClick={() => handleRemoveOption(idx)} size="small" sx={{ color: prelineColors.accent.rose }}>
                      <Trash size={18} weight="bold" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>

            {options.length < 5 && (
              <Button
                startIcon={<Plus size={16} weight="bold" />}
                onClick={handleAddOption}
                sx={{ mt: 1, color: '#27b29b', textTransform: 'none', fontWeight: 600 }}
              >
                Tambah Pilihan
              </Button>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={onClose} sx={{ color: prelineColors.slate[600] }}>
            Batal
          </Button>
          <Button variant="contained" type="submit" sx={{ px: 3 }}>
            Publikasikan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
