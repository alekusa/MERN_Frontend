import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePosts } from "../context/postContext.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost({
          title: post.title,
          description: post.description,
        });
      }
    })();
  }, [params.id, getPost]);

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-zinc-800 p-10 shqdow-md shadow-black">
        <header className="flex justify-between itms-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("El Titulo es requerido"),
            description: Yup.string().required("Se requiere una descripcion"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Titulo
              </label>
              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="description"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                rows={3}
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />

              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Cargar un imagen
              </label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none rouded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 mt-2 rounded text-white focus:outline-none disabled:dg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
