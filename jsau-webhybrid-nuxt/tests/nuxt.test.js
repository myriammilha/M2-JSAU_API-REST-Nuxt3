import { mount } from "@vue/test-utils";
import FileViewer from "@/components/FileViewer.vue";

test("Affiche du contenu HTML correctement", async () => {
  const wrapper = mount(FileViewer, {
    props: {
      content: "<h1>Test HTML</h1>",
    },
  });

  expect(wrapper.html()).toContain("<h1>Test HTML</h1>");
});
