import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import { act } from "@testing-library/react";

import { useOptionalContext } from "../../ContextHelper";
import {
  BreedsContext,
  BreedsContextInterface,
  BreedsProvider,
} from "../BreedsContext";
import Api from "../../../data/api";
import { Breed } from "../../../types";

jest.mock("axios");

describe("BreedsContext", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  const mockBreeds: Breed[] = [
    { id: 1, title: "Breed 1" },
    { id: 2, title: "Breed 2" },
    { id: 3, title: "Breed 3" },
  ];

  const TestComponent: React.FC = () => {
    const { breedsState, pageState, isLoading } =
      useOptionalContext<BreedsContextInterface>(BreedsContext);
    const [breeds] = breedsState;
    const [page, setPage] = pageState;

    return isLoading ? (
      <span>is loading</span>
    ) : (
      <>
        <ul>
          {breeds.map((b) => (
            <li key={`${b.id}-${Math.floor(Math.random() * 1000)}`}>
              {b.title}
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
      <BreedsProvider api={api}>
        <TestComponent />
      </BreedsProvider>
    );

    await act(() => new Promise(setImmediate));

    expect(wrapper.find({ children: "is loading" }).exists()).toBeTruthy();
  });

  it("Is loaded", async () => {
    mockAxios.get.mockResolvedValue({ data: mockBreeds });
    const api = new Api(mockAxios);
    const wrapper = mount(
      <BreedsProvider api={api}>
        <TestComponent />
      </BreedsProvider>
    );

    await act(() => new Promise(setImmediate));
    wrapper.update();

    expect(
      wrapper.find("li").find({ children: mockBreeds[0].title }).exists()
    ).toBeTruthy();
    expect(
      wrapper.find("li").find({ children: mockBreeds[1].title }).exists()
    ).toBeTruthy();
    expect(
      wrapper.find("li").find({ children: mockBreeds[2].title }).exists()
    ).toBeTruthy();
    expect(wrapper.find({ children: "Load more" }).exists()).toBeTruthy();

    wrapper.find({ children: "Load more" }).simulate("click");

    await act(() => new Promise(setImmediate));
    wrapper.update();

    expect(wrapper.find("li").length).toBe(6);
  });
});
