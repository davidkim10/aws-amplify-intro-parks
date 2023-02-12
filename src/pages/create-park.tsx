import { withAuthenticator, FileUploader } from "@aws-amplify/ui-react";
import { useState } from "react";
import { API } from "aws-amplify";
import { createPark } from "@/graphql/mutations";
import config from "@/aws-exports";
import styles from "@/styles/create-park.module.css";
function CreatePark() {
  const [name, setName] = useState("");
  const [imgKey, setImgKey] = useState("");
  const handleChange = (e) => setName(e.target.value);
  const handleImgSuccess = async (e) => setImgKey(e.key);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bucket = config.aws_user_files_s3_bucket;
    const bucketRegion = config.aws_user_files_s3_bucket_region;
    try {
      await API.graphql({
        query: createPark,
        variables: {
          input: {
            name,
            image: {
              bucket,
              region: bucketRegion,
              key: imgKey,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setName("");
      setImgKey("");
    }
  };
  return (
    <section>
      <div className="container">
        <h1 className={styles.heading}>Let&apos;s Add a Park</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.label}>
            Step1: Enter Park Name
          </label>
          <div className="input-group">
            <input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              placeholder="Yosemite Park"
              value={name}
            />
          </div>
          {name.length > 1 && (
            <div className="input-group">
              <FileUploader
                shouldAutoProceed
                maxFileCount={1}
                variation="drop"
                isPreviewerVisible={false}
                acceptedFileTypes={["image/*"]}
                accessLevel="public"
                onSuccess={handleImgSuccess}
              />
            </div>
          )}
          {imgKey && <button className={styles.btn}>Add Park</button>}
        </form>
      </div>
    </section>
  );
}

export default withAuthenticator(CreatePark);
