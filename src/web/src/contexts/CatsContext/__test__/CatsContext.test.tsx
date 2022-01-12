import React from "react";
import { mount } from "enzyme";
import axios from "axios";

import { useOptionalContext } from "../../ContextHelper";
import {
  CatsContext,
  CatsContextInterface,
  CatsProvider,
} from "../CatsContext";
import { act } from "@testing-library/react";
import Api from "../../../data/api";
import { Cat } from "../../../types";

jest.mock("axios");

describe("CatsContext", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  const mockCats: Cat[] = [
    { id: 1, title: "title 1", imageUrl: "https://img.placeholder/1.jpg" },
    { id: 2, title: "title 2", imageUrl: "https://img.placeholder/2.jpg" },
    { id: 3, title: "title 3", imageUrl: "https://img.placeholder/3.jpg" },
  ];

  const TestComponent: React.FC = () => {
    const { catsState, pageState, isLoading } =
      useOptionalContext<CatsContextInterface>(CatsContext);
    const [cats] = catsState;
    const [page, setPage] = pageState;

    return isLoading ? (
      <span>is loading</span>
    ) : (
      <>
        <ul>
          {cats.map((cat) => (
            <li key={`${cat.id}-${Math.floor(Math.random() * 1000)}`}>
              <img src={cat.imageUrl} />
            </li>
          ))}
        </ul>
        <span onClick={() => setPage(page + 1)}>Load more</span>
      </>
    );
  };

  it("Is loading", async () => {
    mockAxios.get.mockResolvedValue({ data: [] });
    const api = new Api(mockAxios);
    const wrapper = mount(
      <CatsProvider api={api}>
        <TestComponent />
      </CatsProvider>
    );

    await act(() => new Promise(setImmediate));

    expect(wrapper.find({ children: "is loading" }).exists()).toBeTruthy();
  });

  it("Is loaded", async () => {
    mockAxios.get.mockResolvedValue({ data: mockCats });
    const api = new Api(mockAxios);
    const wrapper = mount(
      <CatsProvider api={api}>
        <TestComponent />
      </CatsProvider>
    );

    await act(() => new Promise(setImmediate));
    wrapper.update();

    expect(wrapper.find("img").at(0).prop("src")).toEqual(mockCats[0].imageUrl);
    expect(wrapper.find("img").at(1).prop("src")).toEqual(mockCats[1].imageUrl);
    expect(wrapper.find("img").at(2).prop("src")).toEqual(mockCats[2].imageUrl);
    expect(wrapper.find({ children: "Load more" }).exists()).toBeTruthy();
  });

  it("Load second page", async () => {
    mockAxios.get.mockResolvedValue({ data: mockCats });
    const api = new Api(mockAxios);
    const wrapper = mount(
      <CatsProvider api={api}>
        <TestComponent />
      </CatsProvider>
    );

    await act(() => new Promise(setImmediate));
    wrapper.update();

    wrapper.find({ children: "Load more" }).simulate("click");

    await act(() => new Promise(setImmediate));
    wrapper.update();

    expect(wrapper.find("img").length).toBe(3);
  });
});
