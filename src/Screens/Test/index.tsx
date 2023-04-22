import React, { useState, useEffect, FC } from "react";
import * as RmlParser from "@comake/rmlmapper-js";
import "./index.css";

interface TestProps {
  a?: any;
}
const turtleMapping = `
@prefix rr: <http://www.w3.org/ns/r2rml#> .
@prefix rml: <http://semweb.mmlab.be/ns/rml#> .
@prefix schema: <https://schema.org/> .
@prefix ql: <http://semweb.mmlab.be/ns/ql#> .

<#LOGICALSOURCE>
  rml:source "input.json";
  rml:referenceFormulation ql:JSONPath;
  rml:iterator "$".

<#Mapping>
  rml:logicalSource <#LOGICALSOURCE>;

  rr:subjectMap [
    rr:termType rr:BlankNode;
    rr:class schema:Person;
  ];

  rr:predicateObjectMap [
      rr:predicate schema:name;
      rr:objectMap [ rml:reference "name" ];
  ];

	rr:predicateObjectMap [
			rr:predicate schema:age;
			rr:objectMap [ rml:reference "age" ];
	].

	`;

// With a JSON-LD Mapping
const jsonLdMapping = [
  {
    "@type": "https://standardknowledge.com/ontologies/core/Person",
    "http://www.w3.org/ns/r2rml#parentTriplesMap": {
      "@type": "http://www.w3.org/ns/r2rml#TriplesMap",
      "http://semweb.mmlab.be/ns/rml#logicalSource": {
        "@type": "http://semweb.mmlab.be/ns/rml#LogicalSource",
        "http://semweb.mmlab.be/ns/rml#iterator": "$",

        "http://semweb.mmlab.be/ns/rml#referenceFormulation":
          "http://semweb.mmlab.be/ns/ql#JSONPath",
        "http://semweb.mmlab.be/ns/rml#source": "input.json",
      },

      "http://www.w3.org/ns/r2rml#predicateObjectMap": [
        {
          "@type": "http://www.w3.org/ns/r2rml#PredicateObjectMap",
          "http://www.w3.org/ns/r2rml#objectMap": [
            {
              "@type": "http://www.w3.org/ns/r2rml#ObjectMap",
              "http://semweb.mmlab.be/ns/rml#reference": "name",
            },
          ],
          "http://www.w3.org/ns/r2rml#predicate": "https://schema.org/name",
        },
        {
          "@type": ["http://www.w3.org/ns/r2rml#PredicateObjectMap"],
          "http://www.w3.org/ns/r2rml#objectMap": {
            "@type": "http://www.w3.org/ns/r2rml#ObjectMap",
            "http://semweb.mmlab.be/ns/rml#reference": "age",
          },
          "http://www.w3.org/ns/r2rml#predicate": "https://schema.org/age",
        },
      ],
      "http://www.w3.org/ns/r2rml#subjectMap": [
        {
          "@type": "http://www.w3.org/ns/r2rml#SubjectMap",
          "http://www.w3.org/ns/r2rml#class": "https://schema.org/Person",
          "http://www.w3.org/ns/r2rml#termType":
            "http://www.w3.org/ns/r2rml#BlankNode",
        },
      ],
    },
  },
];

const Test: FC<TestProps> = (props) => {
  const [res, setRes] = useState<any>({});
  const [mapping, setMapping] = useState(longFormatTwoNodeJSONLd);

  useEffect(() => {
    (async () => {
      const turtleMappingResult = await RmlParser.parseTurtle(
        turtleMapping,
        inputFiles,
        {
          replace: true,
        }
      );

      console.log("Graph", mapping, twoNodeMappingInput);
      const jsonLdMappingResult = await RmlParser.parseJsonLd(
        { "@graph": mapping },
        twoNodeMappingInput,
        {
          replace: true,
        }
      );
      console.log({
        jsonLdMappingResult,
        turtleMappingResult,
      });
      setRes({ turtleMappingResult, jsonLdMappingResult });
    })();
  }, [mapping]);
  const inputFiles = {
    "input.json": '{ "name": "Adler", "age": 12 }',
  };
  const twoNodeMappingInput = {
    "event.json": JSON.stringify(EventData),
    "user.json": JSON.stringify(UserData),
  };
  // const options = {
  //   toRDF: false,
  //   replace: false,
  // };

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>input</td>
            <td>mapping</td>
            <td>result</td>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
          <td>{JSON.stringify(twoNodeMappingInput)}</td>
          <td>{turtleMapping}</td>
          <td>{JSON.stringify(res.turtleMappingResult ?? "{}")}</td>
        </tr> */}
          <tr>
            <td>{JSON.stringify(twoNodeMappingInput)}</td>
            <td>
              <textarea
                value={JSON.stringify(mapping)}
                onChange={(event) =>
                  setMapping(JSON.parse(event.currentTarget.value))
                }
              ></textarea>
            </td>
            <td>{JSON.stringify(res.jsonLdMappingResult ?? {})}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Test;

const EventData = {
  name: "Event x",
  dates: [{ startDate: "15/03", endDate: "18/03" }],
  speaker: "Aniruddha",
};
const UserData = {
  name: "Avneesh",
  email: "avneesh@mithyalabs.com",
};

const twoNodeJSONLDMapping = {
  "@context": {
    rr: "http://www.w3.org/ns/r2rml#",
    rml: "http://semweb.mmlab.be/ns/rml#",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    schema: "https://schema.org/",
    ex: "http://example.com/",
    ql: "http://semweb.mmlab.be/ns/ql#",
  },
  "@graph": [
    {
      "@id": "#EventTriplesMap",
      "rml:logicalSource": {
        "rml:source": "event.json",
        "rml:referenceFormulation": {
          "@id": "ql:JSONPath",
        },
        "rml:iterator": "$",
      },
      "rr:subjectMap": {
        "rr:template": "http://example.com/events/{name}",
        "rr:class": {
          "@id": "schema:Event",
        },
      },
      "rr:predicateObjectMap": [
        {
          "rr:predicate": {
            "@id": "schema:name",
          },
          "rr:objectMap": {
            "rml:reference": "name",
          },
        },
        {
          "rr:predicate": {
            "@id": "schema:startDate",
          },
          "rr:objectMap": {
            "rml:reference": "dates.0.startDate",
            "rr:datatype": {
              "@id": "xsd:string",
            },
            "rr:language": "en",
          },
        },
        {
          "rr:predicate": {
            "@id": "schema:endDate",
          },
          "rr:objectMap": {
            "rml:reference": "dates.0.endDate",
            "rr:datatype": {
              "@id": "xsd:string",
            },
            "rr:language": "en",
          },
        },
        {
          "rr:predicate": {
            "@id": "schema:author",
          },
          "rr:objectMap": {
            "rr:parentTriplesMap": {
              "@id": "#UserTriplesMap",
            },
          },
        },
      ],
    },
    {
      "@id": "#UserTriplesMap",
      "rml:logicalSource": {
        "rml:source": "user.json",
        "rml:referenceFormulation": {
          "@id": "ql:JSONPath",
        },
        "rml:iterator": "$",
      },
      "rr:subjectMap": {
        "rr:template": "http://example.com/users/{name}",
        "rr:class": {
          "@id": "schema:Person",
        },
      },
      "rr:predicateObjectMap": [
        {
          "rr:predicate": {
            "@id": "schema:name",
          },
          "rr:objectMap": {
            "rml:reference": "name",
          },
        },
        {
          "rr:predicate": {
            "@id": "schema:email",
          },
          "rr:objectMap": {
            "rml:reference": "email",
          },
        },
      ],
    },
  ],
};

// const twoNodeJSONLDMapping =  [
//     {
//       "@id": "#event.json",
//       "http://semweb.mmlab.be/ns/rml#logicalSource": [
//         {
//           "http://semweb.mmlab.be/ns/rml#iterator": [
//             {
//               "@value": "$",
//             },
//           ],
//           "http://semweb.mmlab.be/ns/rml#referenceFormulation": [
//             {
//               "@id": "http://semweb.mmlab.be/ns/ql#JSONPath",
//             },
//           ],
//           "http://semweb.mmlab.be/ns/rml#source": [
//             {
//               "@value": "event.json",
//             },
//           ],
//         },
//       ],
//       "http://www.w3.org/ns/r2rml#subjectMap": [
//         {
//           "http://www.w3.org/ns/r2rml#class": [
//             {
//               "@id": "https://schema.org/event.json",
//             },
//           ],
//           "http://www.w3.org/ns/r2rml#template": [
//             {
//               "@value": "http://example.com/events/{event.json}",
//             },
//           ],
//         },
//       ],
//       "http://www.w3.org/ns/r2rml#predicateObjectMap": [
//         {
//           "http://www.w3.org/ns/r2rml#objectMap": {
//             "http://semweb.mmlab.be/ns/rml#reference": {
//               "@value": "dates",
//             },
//           },
//           "http://www.w3.org/ns/r2rml#predicate": [
//             {
//               "@id": "https://schema.org/dates",
//             },
//           ],
//         },
//       ],
//     },
//   ];

// Long format:

const longFormatTwoNodeJSONLd = [
  {
    "@id": "#EventTriplesMap",
    "http://semweb.mmlab.be/ns/rml#logicalSource": [
      {
        "http://semweb.mmlab.be/ns/rml#iterator": [
          {
            "@value": "$",
          },
        ],
        "http://semweb.mmlab.be/ns/rml#referenceFormulation": [
          {
            "@id": "http://semweb.mmlab.be/ns/ql#JSONPath",
          },
        ],
        "http://semweb.mmlab.be/ns/rml#source": [
          {
            "@value": "event.json",
          },
        ],
      },
    ],
    "http://www.w3.org/ns/r2rml#predicateObjectMap": [
      {
        "http://www.w3.org/ns/r2rml#objectMap": [
          {
            "http://semweb.mmlab.be/ns/rml#reference": [
              {
                "@value": "name",
              },
            ],
          },
        ],
        "http://www.w3.org/ns/r2rml#predicate": [
          {
            "@id": "https://schema.org/name",
          },
        ],
      },
      {
        "http://www.w3.org/ns/r2rml#objectMap": [
          {
            "http://semweb.mmlab.be/ns/rml#reference": [
              {
                "@value": "dates.0.startDate",
              },
            ],
            "http://www.w3.org/ns/r2rml#datatype": [
              {
                "@id": "http://www.w3.org/2001/XMLSchema#string",
              },
            ],
            "http://www.w3.org/ns/r2rml#language": [
              {
                "@value": "en",
              },
            ],
          },
        ],
        "http://www.w3.org/ns/r2rml#predicate": [
          {
            "@id": "https://schema.org/startDate",
          },
        ],
      },
      {
        "http://www.w3.org/ns/r2rml#objectMap": [
          {
            "http://semweb.mmlab.be/ns/rml#reference": [
              {
                "@value": "dates.0.endDate",
              },
            ],
            "http://www.w3.org/ns/r2rml#datatype": [
              {
                "@id": "http://www.w3.org/2001/XMLSchema#string",
              },
            ],
            "http://www.w3.org/ns/r2rml#language": [
              {
                "@value": "en",
              },
            ],
          },
        ],
        "http://www.w3.org/ns/r2rml#predicate": [
          {
            "@id": "https://schema.org/endDate",
          },
        ],
      },
      {
        "http://www.w3.org/ns/r2rml#objectMap": [
          {
            "http://www.w3.org/ns/r2rml#parentTriplesMap": [
              {
                "@id": "#UserTriplesMap",
              },
            ],
          },
        ],
        "http://www.w3.org/ns/r2rml#predicate": [
          {
            "@id": "https://schema.org/author",
          },
        ],
      },
    ],
    "http://www.w3.org/ns/r2rml#subjectMap": [
      {
        "http://www.w3.org/ns/r2rml#class": [
          {
            "@id": "https://schema.org/Event",
          },
        ],
        "http://www.w3.org/ns/r2rml#template": [
          {
            "@value": "http://example.com/events/{name}",
          },
        ],
      },
    ],
  },
  {
    "@id": "#UserTriplesMap",
    "http://semweb.mmlab.be/ns/rml#logicalSource": [
      {
        "http://semweb.mmlab.be/ns/rml#iterator": [
          {
            "@value": "$",
          },
        ],
        "http://semweb.mmlab.be/ns/rml#referenceFormulation": [
          {
            "@id": "http://semweb.mmlab.be/ns/ql#JSONPath",
          },
        ],
        "http://semweb.mmlab.be/ns/rml#source": [
          {
            "@value": "user.json",
          },
        ],
      },
    ],
    "http://www.w3.org/ns/r2rml#predicateObjectMap": [
      {
        "http://www.w3.org/ns/r2rml#objectMap": [
          {
            "http://semweb.mmlab.be/ns/rml#reference": [
              {
                "@value": "name",
              },
            ],
          },
        ],
        "http://www.w3.org/ns/r2rml#predicate": [
          {
            "@id": "https://schema.org/name",
          },
        ],
      },
      {
        "http://www.w3.org/ns/r2rml#objectMap": [
          {
            "http://semweb.mmlab.be/ns/rml#reference": [
              {
                "@value": "email",
              },
            ],
          },
        ],
        "http://www.w3.org/ns/r2rml#predicate": [
          {
            "@id": "https://schema.org/email",
          },
        ],
      },
    ],
    "http://www.w3.org/ns/r2rml#subjectMap": [
      {
        "http://www.w3.org/ns/r2rml#class": [
          {
            "@id": "https://schema.org/Person",
          },
        ],
        "http://www.w3.org/ns/r2rml#template": [
          {
            "@value": "http://example.com/users/{name}",
          },
        ],
      },
    ],
  },
];
