import { get, set, startCase } from "lodash";

// TODO: Replace all Record<string, any> with appropriate types. Mostly Node<NodeObject>;

// TODO: Make all static strings constants.

export const getNameForSubjectMap = (
  subjectMap: Record<string, any>
): string => {
  return get(subjectMap, `[0]["http://www.w3.org/ns/r2rml#class"][0]["@id"]`);
};

export const getSubjectMap = (
  data: Record<string, any>
): Record<string, any> => {
  return get(data, `data["http://www.w3.org/ns/r2rml#subjectMap"]`);
};

export const addSubjectMapToData = (
  data: Record<string, any>,
  subjectMap: Record<string, any>
): Record<string, any> => {
  return set(data, `data["http://www.w3.org/ns/r2rml#subjectMap"]`, [
    // ...(get(data, `data["http://www.w3.org/ns/r2rml#subjectMap"]`) ?? []),
    subjectMap,
  ]);
};

export const createSubjectMap = (key: string) => {
  return {
    "http://www.w3.org/ns/r2rml#class": [
      {
        "@id": `https://schema.org/${startCase(key)}`,
      },
    ],
    "http://www.w3.org/ns/r2rml#template": [
      {
        "@value": `http://example.com/{name}`,
      },
    ],
  };
};

export const getKeyFromData = (data: Record<string, string>): string => {
  // console.log({ data });
  return get(
    data,
    `data["http://semweb.mmlab.be/ns/rml#logicalSource"][0]["http://semweb.mmlab.be/ns/rml#source"][0][@value]`
  );
};

export const createPredicateObjectMapForAttribute = (propName: string) => {
  return {
    "http://www.w3.org/ns/r2rml#objectMap": [
      {
        "http://semweb.mmlab.be/ns/rml#reference": [
          {
            "@value": propName,
          },
        ],
      },
    ],
    "http://www.w3.org/ns/r2rml#predicate": [
      {
        "@id": `https://schema.org/${propName}`,
      },
    ],
  };
};

export const getNameFromPredicateObjectMap = (
  predicateObjectMap: Record<string, any>
) => {
  return get(
    predicateObjectMap,
    `["http://www.w3.org/ns/r2rml#objectMap"][0]["http://semweb.mmlab.be/ns/rml#reference"][0]["@value"]`
  );
};
const PREDICATE_OBJECT_MAP_KEY = `data["http://www.w3.org/ns/r2rml#predicateObjectMap"]`;
export const addPredicateObjectMap = (
  data: Record<string, any>,
  predicateObjectMap: Record<string, any>
): Record<string, any> => {
  return set(data, PREDICATE_OBJECT_MAP_KEY, [
    ...(get(data, PREDICATE_OBJECT_MAP_KEY) ?? []),
    predicateObjectMap,
  ]);
};
const PARENT_TRIPLES_MAP_KEY = `http://www.w3.org/ns/r2rml#parentTriplesMap`;
const OBJECT_MAP_KEY = `http://www.w3.org/ns/r2rml#objectMap`;
export const createPredicateObjectMapForRelation = (
  targetId: string,
  type: string
) => {
  return {
    [OBJECT_MAP_KEY]: [
      {
        [PARENT_TRIPLES_MAP_KEY]: [
          {
            "@id": targetId,
          },
        ],
      },
    ],
    "http://www.w3.org/ns/r2rml#predicate": [
      {
        "@id": `https://schema.org/${type}`,
      },
    ],
  };
};

export const getPredicateObjectMap = (data: Record<string, any>) => {
  return get(data, PREDICATE_OBJECT_MAP_KEY);
};

/**
 * Checks if list of predicate object map has one for relations between two different nodes.
 * POM => Predicate Object Map
 */

export const hasRelationPOM = (
  poms: Record<string, any>[]
): { hasRelationPOM: false } | { hasRelationPOM: true; target: string } => {
  let target: string | undefined;
  poms.forEach((pom) => {
    if (get(pom, `["${OBJECT_MAP_KEY}"][0]["${PARENT_TRIPLES_MAP_KEY}"]`)) {
      target = get(
        pom,
        `["${OBJECT_MAP_KEY}"][0]["${PARENT_TRIPLES_MAP_KEY}"][0]["@id"]`
      );
    }
  });
  return target ? { hasRelationPOM: true, target } : { hasRelationPOM: false };
};
