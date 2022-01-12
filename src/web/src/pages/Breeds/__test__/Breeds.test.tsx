import { act } from "@testing-library/react";
import axios from "axios";
import { mount, shallow } from "enzyme";
import { Ratio } from "react-bootstrap";
import { MemoryRouter, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import Api from "../../../data/api";
import LabelValueField from "../../../components/LabelValueField/LabelValueField";
import { Breed, Cat } from "../../../types";
import Breeds from "../Breeds";
import CatsGallery from "../../../components/CatsGallery/CatsGallery";

jest.mock("axios");

describe("Breeds", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  const mockBreed: Breed = {
    id: 1,
    title: "Tiger",
    details: "Tiger brief description",
  };
  const mockCats: Cat[] = [
    { id: 1, title: "title", imageUrl: "https://img.placeholder/1.jpg" },
    { id: 2, title: "title", imageUrl: "https://img.placeholder/2.jpg" },
    { id: 3, title: "title", imageUrl: "https://img.placeholder/3.jpg" },
  ];

  beforeEach(() => {
    mockAxios.get.mockImplementation((url) => {
      switch (url) {
        case `/v1/breeds/${mockBreed.id}`:
          return Promise.resolve({ data: mockBreed });
        case `/v1/cats?pageSize=10&page=1&breed_id=${mockBreed.id}`:
          return Promise.resolve({ data: mockCats });
        default:
          return Promise.reject("Non mocked resource");
      }
    });
  });

  it("Render Breeds component", () => {
    const wrapper = shallow(
      <Router>
        <Breeds />
      </Router>
    );
  });

  it("Render Breeds and wait for effects", async () => {
    const api = new Api(mockAxios);

    const wrapper = mount(
      <MemoryRouter
        initialEntries={[`/breed/${mockBreed.id}`]}
        initialIndex={0}
      >
        <Route path="/breed/:id">
          <Breeds api={api} />
        </Route>
      </MemoryRouter>
    );

    await act(() => new Promise(setImmediate));
    wrapper.update();

    expect(wrapper.find(Ratio).find("img").exists()).toBeTruthy();
    expect(wrapper.find("h3").text()).toBe(`${mockBreed.title}`);
    expect(
      wrapper
        .find(LabelValueField)
        .find({ label: "Wikipedia", value: mockBreed.details })
        .exists()
    ).toBeTruthy();
    expect(wrapper.find(CatsGallery).exists()).toBeTruthy();
  });
});
