import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner, Image, Ratio } from "react-bootstrap";
import { useParams } from "react-router";

import { Breed, Cat } from "../../types";
import Api, { apiClient } from "../../data/api";
import CatsGallery from "../../components/CatsGallery/CatsGallery";
import styles from "./Breeds.module.css";
import LabelValueField from "../../components/LabelValueField/LabelValueField";

interface BreedsProps {
  api?: Api;
}

interface BreedsParams {
  id: string;
}

const Breeds: React.FC<BreedsProps> = ({ api = apiClient }) => {
  const { id } = useParams<BreedsParams>();
  const [breed, setBreed] = useState<Breed>();
  const [cats, setCats] = useState<Cat[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let result = await api.getBreed(id);
      setBreed(result.data);
    })();
  }, [id, api]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let result = await api.getCatsByBreedId(id, 1, 10);
      setIsLoading(false);
      setCats(result.data);
    })();
  }, [id, api]);

  return (
    <Container className="p-3">
      <Row>
        <Col xs={3}>
          <Ratio className={styles.breedImage}>
            <Image src={breed?.imageUrl} roundedCircle />
          </Ratio>
        </Col>
        <Col xs={9} className="justify-content-start">
          {breed === undefined ? (
            <span>Breed cannot be loaded</span>
          ) : (
            <>
              <h3>{breed.title}</h3>
              <LabelValueField label="Wikipedia" value={breed.details} />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading ? (
            <Spinner className={styles.spinner} animation="border" size="sm" />
          ) : (
            <CatsGallery cats={cats ?? []} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Breeds;
