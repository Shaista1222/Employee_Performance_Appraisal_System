import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentCourse from '../../screens/Student/StudentCourse';
import CourseTeacher from '../../screens/Student/CourseTeacher';
// import Evaluate from '../../screens/Student/Evaluate';
import EvaluationQuestionnaireFragment from '../../screens/EvaluationQuestionnaireFragment'
const Stack = createNativeStackNavigator();

const StudentHome =()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen  options={{headerShown: false}} name="StudentCourse" component={StudentCourse} />
      <Stack.Screen  options={{headerShown: false}} name="CourseTeacher" component={CourseTeacher} />
      <Stack.Screen  options={{headerShown: false}} name="EvaluationQuestionnaire" component={EvaluationQuestionnaireFragment} />
    </Stack.Navigator>
  );
}

export default StudentHome