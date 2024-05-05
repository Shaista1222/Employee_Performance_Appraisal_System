import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentCourse from '../../screens/Student/StudentCourse';
import CourseTeacher from '../../screens/Student/CourseTeacher';
import Evaluate from '../../screens/Student/Evaluate';
import EvaluationQuestionnaire from '../../screens/EvaluationQuestionaire'
const Stack = createNativeStackNavigator();

const StudentHome =()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen  options={{headerShown: false}} name="StudentCourse" component={StudentCourse} />
      <Stack.Screen  options={{headerShown: false}} name="CourseTeacher" component={CourseTeacher} />
      <Stack.Screen  options={{headerShown: false}} name="EvaluateTeacher" component={Evaluate} />
      {/* <Stack.Screen  options={{headerShown: false}} name="EvaluationQuestionnaire" component={EvaluationQuestionnaire} /> */}

    </Stack.Navigator>
  );
}

export default StudentHome