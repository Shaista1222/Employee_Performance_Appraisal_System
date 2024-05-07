import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, FlatList } from 'react-native';
import { QuestionnaireService } from './QuestionnaireService'; // Import your QuestionnaireService if available

const QuestionnaireFragment = () => {
    const [questionnaireTypeSpinnerSelectedItemId, setQuestionnaireTypeSpinnerSelectedItemId] = useState(null);
    const [questionsList, setQuestionsList] = useState([]);
    const [questionnaireTypes, setQuestionnaireTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestionnaireTypes = async () => {
            try {
                const questionnaireService = new QuestionnaireService();
                const types = await questionnaireService.getQuestionnaireType();
                setQuestionnaireTypes(types);
                setLoading(false);
            } catch (error) {
                Alert.alert('Error', error.message);
                setLoading(false);
            }
        };

        fetchQuestionnaireTypes();

        // Cleanup function
        return () => {
            // Perform any cleanup if needed
        };
    }, []);

    const handleItemSelected = async (itemId) => {
        setQuestionnaireTypeSpinnerSelectedItemId(itemId);
        try {
            const questionnaireService = new QuestionnaireService();
            const questions = await questionnaireService.getQuestionnaireByType(itemId);
            setQuestionsList(questions);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.question}</Text>
            {/* Add more details or UI components as needed */}
        </View>
    );

    return (
        <View>
            <FlatList
                data={questionsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {loading && <Text>Loading...</Text>}
            {!loading && (
                <View>
                    <Button
                        title="Add Question"
                        onPress={() => {
                            Alert.alert(
                                'Add Question',
                                'You can add your modal or form UI here to add a new question.',
                                [
                                    { text: 'Cancel', style: 'cancel' },
                                    {
                                        text: 'Save',
                                        onPress: async () => {
                                            try {
                                                const questionnaireService = new QuestionnaireService();
                                                const newQuestion = {
                                                    question: 'Your new question here',
                                                    type_id: questionnaireTypeSpinnerSelectedItemId,
                                                    deleted: false,
                                                };
                                                const addedQuestion = await questionnaireService.postQuestion(newQuestion);
                                                setQuestionsList([...questionsList, addedQuestion]);
                                            } catch (error) {
                                                Alert.alert('Error', error.message);
                                            }
                                        },
                                    },
                                ]
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default QuestionnaireFragment;
