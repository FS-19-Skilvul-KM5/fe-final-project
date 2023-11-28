import MarkdownPreview from "@uiw/react-markdown-preview";
import PropTypes from "prop-types";

const MarkdownEditor = (props) => {
  const handleEditorChange = (e) => {
    props.updateStateFromChild(e.target.value);
  };

  document?.documentElement.setAttribute("data-color-mode", "light");

  return (
    <div>
      <p className="my-2 text-sm ">
        *Untuk lebih mudah bisa menggunakan notion dulu
      </p>
      <div className="grid lg:grid-cols-2  grid-cols-1 gap-3 mb-5">
        <textarea
          className=" overflow-y-auto focus:outline-none border border-black/20 p-5 resize-none rounded-lg"
          value={props.markdown}
          placeholder="Markdown editor"
          onChange={handleEditorChange}
          style={{ width: "100%", height: "300px" }}
        />
        <MarkdownPreview
          className=" overflow-y-auto p-3 rounded-lg  border border-black/20"
          style={{ width: "100%", height: "300px" }}
          source={props.markdown}
        />
      </div>
    </div>
  );
};

MarkdownEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  updateStateFromChild: PropTypes.func.isRequired,
};

export default MarkdownEditor;
