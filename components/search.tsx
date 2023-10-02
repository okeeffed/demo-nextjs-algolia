"use client";

import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import React from "react";
import {
  Hits,
  Highlight,
  SearchBox,
  RefinementList,
  DynamicWidgets,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

const client = algoliasearch("7VV3FKCDBF", "86d82f2b1cce97a741046adb720dba75");

type HitProps = {
  hit: AlgoliaHit<{
    objectID: string;
    title: string;
    description: string;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <div onClick={() => console.log(hit)}>
      <Highlight hit={hit} attribute="title" />
    </div>
  );
}

export default function Search() {
  return (
    <InstantSearchNext searchClient={client} indexName="dev_example" routing>
      <div className="Container">
        <div>
          <DynamicWidgets fallbackComponent={FallbackComponent} />
        </div>
        <div>
          <SearchBox />
          <Hits hitComponent={Hit} />
        </div>
      </div>
    </InstantSearchNext>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return <p>Not found</p>;
}
