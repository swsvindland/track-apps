import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BloodPressureChart } from "../components/bloodPressureChart";

// const SignOut = () => {
//   const { signOut } = useAuth();
//   return (
//     <View className="rounded-lg border-2 border-gray-500 p-4">
//       <Button
//         title="Sign Out"
//         onPress={() => {
//           signOut();
//         }}
//       />
//     </View>
//   );
// };
//
// const PostCard: React.FC<{
//   post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
// }> = ({ post }) => {
//   return (
//     <View className="rounded-lg border-2 border-gray-500 p-4">
//       <Text className="text-xl font-semibold text-[#cc66ff]">{post.title}</Text>
//       <Text className="text-white">{post.content}</Text>
//     </View>
//   );
// };
//
// const CreatePost: React.FC = () => {
//   const utils = trpc.useContext();
//   const { mutate } = trpc.post.create.useMutation({
//     async onSuccess() {
//       await utils.post.all.invalidate();
//     },
//   });
//
//   const [title, onChangeTitle] = React.useState("");
//   const [content, onChangeContent] = React.useState("");
//
//   return (
//     <View className="flex flex-col border-t-2 border-gray-500 p-4">
//       <TextInput
//         className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
//         onChangeText={onChangeTitle}
//         placeholder="Title"
//       />
//       <TextInput
//         className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
//         onChangeText={onChangeContent}
//         placeholder="Content"
//       />
//       <TouchableOpacity
//         className="rounded bg-[#cc66ff] p-2"
//         onPress={() => {
//           mutate({
//             title,
//             content,
//           });
//         }}
//       >
//         <Text className="font-semibold text-white">Publish post</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <BloodPressureChart />
      </View>
    </SafeAreaView>
  );
};
