import React, { useState } from 'react';
import { Box, Typography, Slider, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

const DepressionFormDialog = ({ open, onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(false);

    const questions = [
        {
            text: "How do you currently feel in terms of sadness?",
            options: [
                { label: "Not\nSad", value: "A" },
                { label: "I Feel\nSad", value: "B" },
                { label: "Always\nSad", value: "C" },
                { label: "Can't\nStand", value: "D" }
            ]
        },
        {
            text: "How do you feel about your future?",
            options: [
                { label: "Not\nDiscouraged", value: "A" },
                { label: "Discouraged", value: "B" },
                { label: "Very\nDiscouraged", value: "C" },
                { label: "Hopeless", value: "D" }
            ]
        },
        {
            text: "How do you perceive your past performance and success?",
            options: [
                { label: "Not a\nFailure", value: "A" },
                { label: "Some\nFailures", value: "B" },
                { label: "Mostly\nFailures", value: "C" },
                { label: "Complete\nFailure", value: "D" }
            ]
        },
        {
            text: "How much pleasure do you get out of things that you used to enjoy?",
            options: [
                { label: "Same\nPleasure", value: "A" },
                { label: "Less\nPleasure", value: "B" },
                { label: "No\nPleasure", value: "C" },
                { label: "Bored or\nDispleased", value: "D" }
            ]
        },
        {
            text: "How often do you feel guilty?",
            options: [
                { label: "Not\nGuilty", value: "A" },
                { label: "Sometimes\nGuilty", value: "B" },
                { label: "Mostly\nGuilty", value: "C" },
                { label: "Always\nGuilty", value: "D" }
            ]
        },
        {
            text: "Do you feel like you're being punished?",
            options: [
                { label: "No", value: "A" },
                { label: "Maybe", value: "B" },
                { label: "Expecting\nPunishment", value: "C" },
                { label: "Yes", value: "D" }
            ]
        },
        {
            text: "How disappointed are you in yourself?",
            options: [
                { label: "Not\nDisappointed", value: "A" },
                { label: "Disappointed", value: "B" },
                { label: "Disgusted", value: "C" },
                { label: "I Hate\nMyself", value: "D" }
            ]
        },
        {
            text: "How critical are you of yourself?",
            options: [
                { label: "Not\nCritical", value: "A" },
                { label: "Somewhat\nCritical", value: "B" },
                { label: "Very\nCritical", value: "C" },
                { label: "I Blame\nMyself", value: "D" }
            ]
        },
        {
            text: "Do you have thoughts of killing yourself?",
            options: [
                { label: "No\nThoughts", value: "A" },
                { label: "Some\nThoughts", value: "B" },
                { label: "Want to", value: "C" },
                { label: "Would do", value: "D" }
            ]
        },
        {
            text: "How often do you cry?",
            options: [
                { label: "No\nMore", value: "A" },
                { label: "More Than\nBefore", value: "B" },
                { label: "Always", value: "C" },
                { label: "Can't\nCry Anymore", value: "D" }
            ]
        },
        {
            text: "How easily are you irritated?",
            options: [
                { label: "Not\nIrritated", value: "A" },
                { label: "Slightly\nIrritated", value: "B" },
                { label: "Often\nIrritated", value: "C" },
                { label: "Always\nIrritated", value: "D" }
            ]
        },
        {
            text: "How interested are you in other people?",
            options: [
                { label: "Haven't\nLost Interest", value: "A" },
                { label: "Less\nInterest", value: "B" },
                { label: "Lost\nMost of it", value: "C" },
                { label: "Lost\nAll of it", value: "D" }
            ]
        },
        {
            text: "How do you make decisions?",
            options: [
                { label: "Same\nAs Before", value: "A" },
                { label: "Delay\nDecisions", value: "B" },
                { label: "With Great\nDifficulty", value: "C" },
                { label: "Can't\nDecide", value: "D" }
            ]
        },
        {
            text: "How do you feel about your appearance?",
            options: [
                { label: "No\nChange", value: "A" },
                { label: "Worried", value: "B" },
                { label: "Unattractive", value: "C" },
                { label: "Ugly", value: "D" }
            ]
        },
        {
            text: "How well do you work?",
            options: [
                { label: "Same\nAbility", value: "A" },
                { label: "Needs\nEffort", value: "B" },
                { label: "Have to\nPush Hard", value: "C" },
                { label: "Can't\nWork", value: "D" }
            ]
        },
        {
            text: "How well do you sleep?",
            options: [
                { label: "Sleep\nWell", value: "A" },
                { label: "Less\nSleep", value: "B" },
                { label: "Wakeup\nEarly", value: "C" },
                { label: "Can't\nSleep", value: "D" }
            ]
        },
        {
            text: "How tired do you feel?",
            options: [
                { label: "Not\nTired", value: "A" },
                { label: "Tired\nEasily", value: "B" },
                { label: "Always\nTired", value: "C" },
                { label: "Too\nTired", value: "D" }
            ]
        },
        {
            text: "How is your appetite?",
            options: [
                { label: "Normal", value: "A" },
                { label: "Less\nAppetite", value: "B" },
                { label: "Much\nWorse", value: "C" },
                { label: "No\nAppetite", value: "D" }
            ]
        },
        {
            text: "Have you lost weight recently?",
            options: [
                { label: "No\nLoss", value: "A" },
                { label: "Some\nLoss", value: "B" },
                { label: "10+\nPounds", value: "C" },
                { label: "15+\nPounds", value: "D" }
            ]
        },
        {
            text: "How worried are you about your health?",
            options: [
                { label: "Not\nWorried", value: "A" },
                { label: "Slight\nWorry", value: "B" },
                { label: "Very\nWorried", value: "C" },
                { label: "Obsessive\nWorry", value: "D" }
            ]
        },
        {
            text: "Have you noticed any change in your interest in relationships?",
            options: [
                { label: "No\nChange", value: "A" },
                { label: "Less\nInterest", value: "B" },
                { label: "Almost\nNone", value: "C" },
                { label: "Lost\nAll", value: "D" }
            ]
        }
    ];

    const [answers, setAnswers] = useState(
        Object.fromEntries(questions.map(q => [q.text, 0]))
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

    const handleSubmit = async () => {
        setLoading(true);

        try {
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

            const data = {
                a_options_depression: firstChoices,
                b_options_depression: secondChoices,
                a_mfs_depression: firstMemberships,
                b_mfs_depression: secondMemberships,
                a_options_anxiety: null,
                b_options_anxiety: null,
                a_mfs_anxiety: null,
                b_mfs_anxiety: null
            };
            console.log('Submitting data:', data);

            const response = await fetch('http://127.0.0.1:5000/api/depression-output', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            onClose();
        } catch (error) {
            console.error('Error during submission:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDialogClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            maxWidth="md"
            fullWidth
        >
            <Box className="depression-form-container p-4" sx={{ bgcolor: '#f9f9f9', borderRadius: 2, padding: '20px' }}>
                <DialogTitle className="depression-form-header" sx={{ textAlign: 'center', pb: 2 }}>
                    <Typography variant="h4" component="div" className="font-sans" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Depression Assessment
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>
                        Place the marker where it feels right
                    </Typography>
                </DialogTitle>
                <DialogContent className="depression-form-content" sx={{ padding: '20px' }}>
                    {questions.map((question, index) => (
                        <Box key={index} className="depression-form-item my-4" sx={{ mb: 4, padding: '20px' }}>
                            <Typography variant="h6" component="div" className="font-sans" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                                {`${index + 1}. ${question.text}`}
                            </Typography>
                            <Grid container alignItems="center" spacing={2} sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                <Grid item xs={12}>
                                    <Slider
                                        value={answers[question.text]}
                                        onChange={(e, newValue) => handleSliderChange(question.text, newValue)}
                                        min={0}
                                        max={3}
                                        step={0.01}
                                        marks={question.options.map((option, i) => ({
                                            value: i,
                                            label: option.label,
                                        }))}
                                        sx={{
                                            width: '100%',
                                            color: '#9DD2F2',
                                            '& .MuiSlider-markLabel': {
                                                fontSize: isMobile ? '0.7rem' : '1rem',
                                                whiteSpace: 'pre-wrap',
                                                textAlign: 'center',
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pt: 2 }}>
                    <Button
                        onClick={handleSubmit}
                        className="depression-form-button"
                        variant="contained"
                        sx={{ bgcolor: '#9DD2F2', textTransform: 'none', fontWeight: 'bold', px: 4, py: 1.5 }}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default DepressionFormDialog;
