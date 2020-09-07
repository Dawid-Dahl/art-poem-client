import {
	sampleArtPoems,
	sampleArtPoemArray1,
	sampleArtPoemArray2,
	sampleReduxCollection1,
	sampleReduxCollection2,
} from "./dummyData";
import {sortArtPoemsByCollection} from "./utils";
import {ReduxArtPoem, ReduxCollection, User} from "../types/types";

describe("sortArtPoemsByCollection", () => {
	describe("happy path", () => {
		it("should return a sorted array", () => {
			const reduxCollection = sampleReduxCollection1;
			const expected = sampleArtPoemArray1;
			expect(sortArtPoemsByCollection(sampleArtPoems, reduxCollection)).toEqual(expected);
		});
		it("should return a sorted array if more than two items share the same collection", () => {
			const reduxCollection = sampleReduxCollection2;
			const expected = sampleArtPoemArray2;
			expect(sortArtPoemsByCollection(sampleArtPoems, reduxCollection)).toEqual(expected);
		});
	});
	describe("sad path", () => {
		it("should return an empty array if given an empty array as a list", () => {
			const reduxCollection = sampleReduxCollection1;
			const expected: ReduxArtPoem[] = [];
			expect(sortArtPoemsByCollection([], reduxCollection)).toEqual(expected);
		});
		it("should return an empty array if given null as a list", () => {
			const reduxCollection = sampleReduxCollection1;
			const expected: ReduxArtPoem[] = [];
			//@ts-ignore
			expect(sortArtPoemsByCollection(null, reduxCollection)).toEqual(expected);
		});
		it("should return an empty array if given null as a reduxCollection", () => {
			const reduxCollection: ReduxCollection | null = null;
			const expected: ReduxArtPoem[] = [];
			expect(sortArtPoemsByCollection([], reduxCollection)).toEqual(expected);
		});
	});
});
