import React from 'react';
 import { View, Text, Pressable } from 'react-native';

 const index = () => {
   const handlePress = () => {
     console.log('Test Press');
   };

   return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Pressable onPress={handlePress}>
         <Text>Test Button</Text>
       </Pressable>
     </View>
   );
 };

 export default index;