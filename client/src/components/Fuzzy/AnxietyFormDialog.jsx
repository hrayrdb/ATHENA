import React, { useState } from 'react';
import { Box, Typography, Slider, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';

const AnxietyFormDialog = ({ open, onClose }) => {
    const questions = [
        "Numbness or tingling",
        "Feeling hot",
        "Wobbliness in legs",
        "Unable to relax",
        "Fear of worst happening",
        "Dizzy or lightheaded",
        "Heart pounding / racing",
        "Unsteady",
        "Terrified or afraid",
        "Nervous",
        "Feeling of choking",
        "Hands trembling",
        "Shaky / unsteady",
        "Fear of losing control",
        "Difficulty in breathing",
        "Fear of dying",
        "Scared",
        "Indigestion",
        "Faint / lightheaded",
        "Face flushed",
        "Hot / cold sweats"
    ];

    const [answers, setAnswers] = useState(
        Object.fromEntries(questions.map(q => [q, 0])) // Initial value for each question is set to 0 ("Not at all")
    );

    const handleSliderChange = (question, newValue) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question]: newValue,
        }));
    };

    const calculateMemberships = (value) => {
        const base = Math.floor(value);
        const remainder = value - base;

        const firstChoice = base;
        const secondChoice = base < 3 ? base + 1 : base;

        const firstMembership = 1 - remainder;
        const secondMembership = remainder;

        return {
            firstChoice,
            secondChoice,
            firstMembership,
            secondMembership
        };
    };

    const handleSubmit = () => {
        const firstChoices = [];
        const secondChoices = [];
        const firstMemberships = [];
        const secondMemberships = [];

        questions.forEach(({ text, options }) => {
            const value = answers[text];
            const { firstChoice, secondChoice, firstMembership, secondMembership } = calculateMemberships(value);

            const validFirstChoice = options[firstChoice] ? options[firstChoice].value : null;
            const validSecondChoice = options[secondChoice] ? options[secondChoice].value : null;

            if (firstMembership >= secondMembership) {
                if (validFirstChoice !== null) firstChoices.push(validFirstChoice);
                if (validSecondChoice !== null) secondChoices.push(validSecondChoice);
                firstMemberships.push(firstMembership.toFixed(2));
                secondMemberships.push(secondMembership.toFixed(2));
            } else {
                if (validSecondChoice !== null) firstChoices.push(validSecondChoice);
                if (validFirstChoice !== null) secondChoices.push(validFirstChoice);
                firstMemberships.push(secondMembership.toFixed(2));
                secondMemberships.push(firstMembership.toFixed(2));
            }
        });

        // Only send anxiety data, leave depression data as it is
        const data = {
            a_options_depression: null, // or keep existing state if you are maintaining it
            b_options_depression: null,
            a_mfs_depression: null,
            b_mfs_depression: null,
            a_options_anxiety: firstChoices,
            b_options_anxiety: secondChoices,
            a_mfs_anxiety: firstMemberships,
            b_mfs_anxiety: secondMemberships
        };

        fetch('/api/anxiety-output', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                onClose(); // Close the dialog after submission
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const sliderMarks = [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Mildly' },
        { value: 2, label: 'Moderately' },
        { value: 3, label: 'Severely' }
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Box className="anxiety-form-container p-4" sx={{ bgcolor: '#f9f9f9', borderRadius: 2, padding: '20px' }}>
                <DialogTitle className="anxiety-form-header" sx={{ textAlign: 'center', pb: 2 }}>
                    <Typography variant="h4" component="h2" className="font-sans" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Anxiety Assessment
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>
                        Place the marker where it feels right
                    </Typography>
                </DialogTitle>
                <DialogContent className="anxiety-form-content" sx={{ padding: '20px' }}>
                    {questions.map((question, index) => (
                        <Box key={index} className="anxiety-form-item my-4" sx={{ mb: 4, padding: '10px' }}>
                            <Typography variant="h6" className="font-sans" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                                {`${index + 1}. ${question}`}
                            </Typography>
                            <Grid container alignItems="center" spacing={2} sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                <Grid item xs={12}>
                                    <Slider
                                        value={answers[question]}
                                        onChange={(e, newValue) => handleSliderChange(question, newValue)}
                                        min={0}
                                        max={3}
                                        step={0.01}
                                        marks={sliderMarks}
                                        sx={{ width: '100%', color: '#9DD2F2' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pt: 2 }}>
                    <Button
                        onClick={handleSubmit}
                        className="anxiety-form-button"
                        variant="contained"
                        sx={{ bgcolor: '#9DD2F2', textTransform: 'none', fontWeight: 'bold', px: 4, py: 1.5 }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default AnxietyFormDialog;
