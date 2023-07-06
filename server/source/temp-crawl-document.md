Node.JS Client
==============

[Suggest Edits](/edit/node-client)

This page provides installation instructions, usage examples, and a reference for the [Pinecone Node.JS client](https://github.com/pinecone-io/pinecone-ts-client).

> ### ⚠️
> 
> Warning
> 
> This is a **public preview** ("Beta") client. Test thoroughly before  
> using this client for production workloads. No SLAs or technical support  
> commitments are provided for this client. Expect potential breaking  
> changes in future releases.

Getting Started

[](#getting-started)
---------------------------------------

### 

Installation

[](#installation)

Use the following shell command to install the Node.JS client for use with Node.JS versions 17 and above:

Shell

`npm install @pinecone-database/pinecone`

Alternatively, you can install Pinecone with Yarn:

Shell

`yarn add @pinecone-database/pinecone`

### 

Usage

[](#usage)

#### 

Initialize the client

[](#initialize-the-client)

To initialize the client, instantiate the `PineconeClient` class and call the `init` method. The `init` method takes an object with the `apiKey` and `environment` properties:

JavaScript

`import { PineconeClient } from "@pinecone-database/pinecone";  const pinecone = new PineconeClient(); await pinecone.init({   environment: "YOUR_ENVIRONMENT",   apiKey: "YOUR_API_KEY", });`

#### 

Create index

[](#create-index)

The following example creates an index without a metadata configuration. By default, Pinecone indexes all metadata.

JavaScript

`await pinecone.createIndex({   createRequest: {     name: "example-index",     dimension: 1024,   }, });`

The following example creates an index that only indexes the "color" metadata field. Queries against this index cannot filter based on any other metadata field.

JavaScript

`await pinecone.createIndex({   createRequest: {     name: "example-index-2",     dimension: 1024,     metadataConfig: {       indexed: ["color"],     },   }, });`

#### 

List indexes

[](#list-indexes)

The following example logs all indexes in your project.

JavaScript

`const indexesList = await pinecone.listIndexes();`

#### 

Describe index

[](#describe-index)

The following example logs information about the index `example-index`.

JavaScript

`const indexDescription = await pinecone.describeIndex({   indexName: "example-index", });`

#### 

Delete index

[](#delete-index)

The following example deletes `example-index`.

JavaScript

`await pinecone.deleteIndex({   indexName: "example-index", });`

#### 

Scale replicas

[](#scale-replicas)

The following example sets the number of replicas and pod type for `example-index`.

JavaScript

`await pinecone.configureIndex({   indexName: "example-index",   patchRequest: {     replicas: 2,     podType: "p2",   }, });`

#### 

Describe index statistics

[](#describe-index-statistics)

The following example returns statistics about the index `example-index`.

JavaScript

`const index = pinecone.Index("example-index"); const indexStats = index.describeIndexStats({   describeIndexStatsRequest: {     filter: {},   }, });`

#### 

Upsert vectors

[](#upsert-vectors)

The following example upserts vectors to `example-index`.

JavaScript

`const index = pinecone.Index("example-index"); const upsertRequest = {   vectors: [     {       id: "vec1",       values: [0.1, 0.2, 0.3, 0.4],       metadata: {         genre: "drama",       },     },     {       id: "vec2",       values: [0.2, 0.3, 0.4, 0.5],       metadata: {         genre: "action",       },     },   ],   namespace: "example-namespace", }; const upsertResponse = await index.upsert({ upsertRequest });`

#### 

Query an index

[](#query-an-index)

The following example queries the index `example-index` with metadata filtering.

JavaScript

`const index = pinecone.Index("example-index"); const queryRequest = {   vector: [0.1, 0.2, 0.3, 0.4],   topK: 10,   includeValues: true,   includeMetadata: true,   filter: {     genre: { $in: ["comedy", "documentary", "drama"] },   },   namespace: "example-namespace", }; const queryResponse = await index.query({ queryRequest });`

#### 

Delete vectors

[](#delete-vectors)

The following example deletes vectors by ID.

JavaScript

`const index = pinecone.Index("example-index"); await index.delete1({   ids: ["vec1", "vec2"],   namespace: "example-namespace", });`

#### 

Fetch vectors

[](#fetch-vectors)

The following example fetches vectors by ID.

JavaScript

`const index = pinecone.Index("example-index"); const fetchResponse = await index.fetch({   ids: ["vec1", "vec2"],   namespace: "example-namespace", });`

#### 

Update vectors

[](#update-vectors)

The following example updates vectors by ID.

JavaScript

`const index = pinecone.Index("example-index"); const updateRequest = {   id: "vec1",   values: [0.1, 0.2, 0.3, 0.4],   setMetadata: { genre: "drama" },   namespace: "example-namespace", }; const updateResponse = await index.update({ updateRequest });`

#### 

Create collection

[](#create-collection)

The following example creates the collection `example-collection` from `example-index`.

JavaScript

`const createCollectionRequest = {   name: "example-collection",   source: "example-index", };  await pinecone.createCollection({   createCollectionRequest, });`

#### 

List collections

[](#list-collections)

The following example returns a list of the collections in the current project.

JavaScript

`const collectionsList = await pinecone.listCollections();`

#### 

Describe a collection

[](#describe-a-collection)

The following example returns a description of the collection `example-collection`.

JavaScript

`const collectionDescription = await pinecone.describeCollection({   collectionName: "example-collection", });`

#### 

Delete a collection

[](#delete-a-collection)

The following example deletes the collection `example-collection`.

JavaScript

`await pinecone.deleteCollection({   collectionName: "example-collection", });`

Reference

[](#reference)
---------------------------

For the REST API or other clients, see [the API reference](/reference/).

### 

init()

[](#init)

`pinecone.init(configuration: PineconeClientConfiguration)`

Initialize the Pinecone client.

Parameters

Type

Description

`configuration`

PineconeClientConfiguration

The configuration for the Pinecone client.

#### 

Types

[](#types)

##### 

PineconeClientConfiguration

[](#pineconeclientconfiguration)

Parameters

Type

Description

`apiKey`

string

The API key for the Pinecone service.

`environment`

string

The cloud environment of your Pinecone project.

Example:

JavaScript

`import { PineconeClient } from "@pinecone-database/pinecone"; const pinecone = new PineconeClient(); await pinecone.init({   apiKey: "YOUR_API_KEY",   environment: "YOUR_ENVIRONMENT", });`

### 

configureIndex()

[](#configureindex)

`pinecone.configure_index(indexName: string, patchRequest?: PatchRequest)`

Configure an index to change pod type and number of replicas.

Parameters

Type

Description

`requestParameters`

ConfigureIndexRequest

Index configuration parameters.

#### 

Types

[](#types-1)

##### 

ConfigureIndexRequest

[](#configureindexrequest)

Parameters

Type

Description

`indexName`

string

The name of the index.

`patchRequest`

PatchRequest

(Optional) Patch request parameters.

##### 

PatchRequest

[](#patchrequest)

Parameters

Type

Description

`replicas`

number

(Optional) The number of replicas to configure for this index.

`podType`

string

(Optional) The new pod type for the index. One of `s1`, `p1`, or `p2` appended with `.` and one of `x1`, `x2`, `x4`, or `x8`.

Example:

JavaScript

`const newNumberOfReplicas = 4; const newPodType = "s1.x4"; await pinecone.configureIndex({   indexName: "example-index",   patchRequest: {     replicas: newNumberOfReplicas,     podType: newPodType,   }, });`

### 

createCollection()

[](#createcollection)

`pinecone.createCollection(requestParameters: CreateCollectionOperationRequest)`

Create a collection from an index.

Parameters

Type

Description

`requestParameters`

CreateCollectionOperationRequest

Create collection operation wrapper

#### 

Types

[](#types-2)

##### 

CreateCollectionOperationRequest

[](#createcollectionoperationrequest)

Parameters

Type

Description

`createCollectionRequest`

CreateCollectionRequest

Collection request parameters.

##### 

CreateCollectionRequest

[](#createcollectionrequest)

Parameters

Type

Description

`name`

string

The name of the collection to be created.

`source`

string

The name of the source index to be used as the source for the collection.

Example:

JavaScript

`await pinecone.createCollection({   createCollectionRequest: {     name: "example-collection",     source: "example-index",   }, });`

### 

createIndex()

[](#createindex)

`pinecone.createIndex(requestParameters?: CreateIndexRequest)`

Create an index.

Parameters

Type

Description

`requestParameters`

CreateIndexRequest

Create index operation wrapper

#### 

Types

[](#types-3)

#### 

CreateIndexRequest

[](#createindexrequest)

Parameters

Type

Description

`createRequest`

CreateRequest

Create index request parameters

##### 

CreateRequest

[](#createrequest)

Parameters

Type

Description

`name`

str

The name of the index to be created. The maximum length is 45 characters.

`dimension`

integer

The dimensions of the vectors to be inserted in the index.

`metric`

str

(Optional) The distance metric to be used for similarity search: 'euclidean', 'cosine', or 'dotproduct'.

`pods`

int

(Optional) The number of pods for the index to use, including replicas.

`replicas`

int

(Optional) The number of replicas.

`pod_type`

str

(Optional) The new pod type for the index. One of `s1`, `p1`, or `p2` appended with `.` and one of `x1`, `x2`, `x4`, or `x8`.

`metadata_config`

object

(Optional) Configuration for the behavior of Pinecone's internal metadata index. By default, all metadata is indexed; when metadata\_config is present, only specified metadata fields are indexed. To specify metadata fields to index, provide a JSON object of the following form: `{"indexed": ["example_metadata_field"]}`

`source_collection`

str

(Optional) The name of the collection to create an index from.

Example:

JavaScript

`// The following example creates an index without a metadata // configuration. By default, Pinecone indexes all metadata. await pinecone.createIndex({   createRequest: {     name: "pinecone-index",     dimension: 1024,   }, });  // The following example creates an index that only indexes // the 'color' metadata field. Queries against this index // cannot filter based on any other metadata field.  await pinecone.createIndex({   createRequest: {     name: "example-index-2",     dimension: 1024,     metadata_config: {       indexed: ["color"],     },   }, });`

### 

deleteCollection()

[](#deletecollection)

`pinecone.deleteCollection(requestParameters: DeleteCollectionRequest)`

Delete an existing collection.

### 

Types

[](#types-4)

Parameters

Type

Description

`requestParameters`

DeleteCollectionRequest

Delete collection request parameters

#### 

DeleteCollectionRequest

[](#deletecollectionrequest)

Parameters

Type

Description

`collectionName`

string

The name of the collection to delete.

Example:

JavaScript

`await pinecone.deleteCollection({   collectionName: "example-collection", });`

### 

deleteIndex()

[](#deleteindex)

`pinecone.deleteIndex(requestParameters: DeleteIndexRequest)`

Delete an index.

### 

Types

[](#types-5)

Parameters

Type

Description

`requestParameters`

DeleteIndexRequest

Delete index request parameters

##### 

DeleteIndexRequest

[](#deleteindexrequest)

Parameters

Type

Description

`indexName`

string

The name of the index to delete.

Example:

JavaScript

`await pinecone.deleteIndex({   indexName: "example-index", });`

### 

describeCollection()

[](#describecollection)

`pinecone.describeCollection(requestParameters: DescribeCollectionRequest)`

Get a description of a collection.

#### 

Types

[](#types-6)

Parameters

Type

Description

`requestParameters`

DescribeCollectionRequest

Describe collection request parameters

##### 

DescribeCollectionRequest

[](#describecollectionrequest)

Parameters

Type

Description

`collectionName`

string

The name of the collection.

Example:

JavaScript

`const collectionDescription = await pinecone.describeCollection({   collectionName: "example-collection", });`

Return:

*   `collectionMeta` : `object` Configuration information and deployment status of the collection.
    *   `name` : `string` The name of the collection.
    *   `size`: `integer` The size of the collection in bytes.
    *   `status`: `string` The status of the collection.

### 

describeIndex()

[](#describeindex)

`pinecone.describeIndex(requestParameters: DescribeIndexRequest)`

Get a description of an index.

#### 

Types

[](#types-7)

Parameters

Type

Description

`requestParameters`

DescribeIndexRequest

Describe index request parameters

##### 

DescribeIndexRequest

[](#describeindexrequest)

Parameters

Type

Description

`indexName`

string

The name of the index.

#### 

Types

[](#types-8)

Returns:

*   `database` : `object`
*   `name` : `string` The name of the index.
*   `dimension` : `integer` The dimensions of the vectors to be inserted in the index.
*   `metric` : `string` The distance metric used for similarity search: 'euclidean', 'cosine', or 'dotproduct'.
*   `pods` : `integer` The number of pods the index uses, including replicas.
*   `replicas` : `integer` The number of replicas.
*   `pod_type` : `string` The pod type for the index. One of `s1`, `p1`, or `p2` appended with `.` and one of `x1`, `x2`, `x4`, or `x8`.
*   `metadata_config`: `object` Configuration for the behavior of Pinecone's internal metadata index. By default, all metadata is indexed; when metadata\_config is present, only specified metadata fields are indexed. To specify metadata fields to index, provide a JSON object of the following form: `{"indexed": ["example_metadata_field"]}`
*   `status` : `object`
*   `ready` : `boolean` Whether the index is ready to serve queries.
*   `state` : `string` One of `Initializing`, `ScalingUp`, `ScalingDown`, `Terminating`, or `Ready`.

Example:

JavaScript

`const indexDescription = await pinecone.describeIndex({   indexName: "example-index", });`

### 

listCollections

[](#listcollections)

`pinecone.listCollections()`

Return a list of the collections in your project.

Example:

JavaScript

`const collections = await pinecone.listCollections();`

Returns:

*   `array` of `strings` The names of the collections in your project.

### 

listIndexes

[](#listindexes)

`pinecone.listIndexes()`

Return a list of your Pinecone indexes.

Returns:

*   `array` of `strings` The names of the indexes in your project.

Example:

JavaScript

`const indexesList = await pinecone.listIndexes();`

### 

Index()

[](#index)

`pinecone.Index(indexName: string)`

Construct an Index object.

Parameters

Type

Description

`indexName`

string

The name of the index.

Example:

JavaScript

`const index = pinecone.Index("example-index");`

### 

Index.delete1()

[](#indexdelete1)

`index.delete(requestParameters: Delete1Request)`

Delete items by their ID from a single namespace.

Parameters

Type

Description

`requestParameters`

Delete1Request

Delete request parameters

#### 

Types

[](#types-9)

##### 

Delete1Request

[](#delete1request)

Parameters

Type

Description

`ids`

Array

(Optional) The IDs of the items to delete.

`deleteAll`

boolean

(Optional) Indicates that all vectors in the index namespace should be deleted.

`namespace`

str

(Optional) The namespace to delete vectors from, if applicable.

#### 

Types

[](#types-10)

Example:

JavaScript

`await index.delete1({   ids: ["example-id-1", "example-id-2"],   namespace: "example-namespace", });`

### 

Index.describeIndexStats()

[](#indexdescribeindexstats)

`index.describeIndexStats(requestParameters: DescribeIndexStatsOperationRequest)`

Returns statistics about the index's contents, including the vector count per namespace and the number of dimensions.

Parameters

Type

Description

`requestParameters`

DescribeIndexStatsOperationRequest

Describe index stats request wrapper

#### 

Types

[](#types-11)

##### 

DescribeIndexStatsOperationRequest

[](#describeindexstatsoperationrequest)

Parameters

Type

Description

`describeIndexStatsRequest`

DescribeIndexStatsRequest

Describe index stats request parameters

##### 

DescribeIndexStatsRequest

[](#describeindexstatsrequest)

parameter

Type

Description

`filter`

object

(Optional) A metadata filter expression.

Returns:

*   `namespaces` : `object` A mapping for each namespace in the index from the namespace name to a  
    summary of its contents. If a metadata filter expression is present, the summary will reflect only vectors matching that expression.
*   `dimension` : `int64` The dimension of the indexed vectors.
*   `indexFullness` : `float` The fullness of the index, regardless of whether a metadata filter expression was passed. The granularity of this metric is 10%.
*   `totalVectorCount` : `int64` The total number of vectors in the index.

Example:

JavaScript

`const indexStats = await index.describeIndexStats({   describeIndexStatsRequest: {}, });`

Read more about [filtering](https://www.pinecone.io/docs/metadata-filtering/) for more detail.

### 

Index.fetch()

[](#indexfetch)

`index.fetch(requestParameters: FetchRequest)`

The Fetch operation looks up and returns vectors, by ID, from a single namespace. The returned vectors include the vector data and metadata.

Parameters

Type

Description

`requestParameters`

FetchRequest

Fetch request parameters

#### 

Types

[](#types-12)

##### 

FetchRequest

[](#fetchrequest)

Parameters

Type

Description

`ids`

Array

The vector IDs to fetch. Does not accept values containing spaces.

`namespace`

string

(Optional) The namespace containing the vectors.

Returns:

*   `vectors` : `object` Contains the vectors.
*   `namespace` : `string` The namespace of the vectors.

Example:

JavaScript

`const fetchResponse = await index.fetch({   ids: ["example-id-1", "example-id-2"],   namespace: "example-namespace", });`

### 

Index.query()

[](#indexquery)

`index.query(requestParameters: QueryOperationRequest)`

Search a namespace using a query vector. Retrieves the ids of the most similar items in a namespace, along with their similarity scores.

Parameters

Type

Description

`requestParameters`

QueryOperationRequest

The query operation request wrapper.

#### 

Types

[](#types-13)

Parameters

Type

Description

`queryRequest`

QueryRequest

The query operation request.

##### 

QueryRequest

[](#queryrequest)

Parameter

Type

Description

`namespace`

string

(Optional) The namespace to query.

`topK`

number

The number of results to return for each query.

`filter`

object

(Optional) The filter to apply. You can use vector metadata to limit your search. See [https://www.pinecone.io/docs/metadata-filtering/](https://www.pinecone.io/docs/metadata-filtering/).

`includeValues`

boolean

(Optional) Indicates whether vector values are included in the response. Defaults to `false`.

`includeMetadata`

boolean

(Optional) Indicates whether metadata is included in the response as well as the ids. Defaults to `false`.

`vector`

Array

(Optional) The query vector. This should be the same length as the dimension of the index being queried. Each `query()` request can contain only one of the parameters `id` or `vector`.

`id`

string

(Optional) The unique ID of the vector to be used as a query vector. Each `query()` request can contain only one of the parameters `vector` or `id`.

Example:

JavaScript

`const queryResponse = await index.query({   queryRequest: {     namespace: "example-namespace",     topK: 10,     filter: {       genre: { $in: ["comedy", "documentary", "drama"] },     },     includeValues: true,     includeMetadata: true,     vector: [0.1, 0.2, 0.3, 0.4],   }, });`

### 

Index.update()

[](#indexupdate)

`index.update(requestParameters: UpdateOperationRequest)`

Updates vectors in a namespace. If a value is included, it will overwrite the previous value.  
If `setMetadata` is included in the `updateRequest`, the values of the fields specified in it will be added or overwrite the previous value.

Parameters

Type

Description

`requestParameters`

UpdateOperationRequest

The update operation wrapper

#### 

Types

[](#types-14)

##### 

UpdateOperationRequest

[](#updateoperationrequest)

Parameters

Type

Description

`updateRequest`

UpdateRequest

The update request.

##### 

UpdateRequest

[](#updaterequest)

Parameter

Type

Description

`id`

string

The vector's unique ID.

`values`

Array

(Optional) Vector data.

`setMetadata`

object

(Optional) Metadata to set for the vector.

`namespace`

string

(Optional) The namespace containing the vector.

Example:

JavaScript

`const updateResponse = await index.update({   updatedRequest: {     id: "vec1",     values: [0.1, 0.2, 0.3, 0.4],     setMetadata: {       genre: "drama",     },     namespace: "example-namespace",   }, });`

### 

Index.upsert()

[](#indexupsert)

`index.upsert(requestParameters: UpsertOperationRequest)`

Writes vectors into a namespace. If a new value is upserted for an existing vector ID, it will overwrite the previous value.

Parameters

Type

Description

`requestParameters`

UpsertOperationRequest

Upsert operation wrapper

#### 

Types

[](#types-15)

##### 

UpsertOperationRequest

[](#upsertoperationrequest)

Parameters

Type

Description

`upsertRequest`

UpsertRequest

The upsert request.

##### 

UpsertRequest

[](#upsertrequest)

| Parameter | Type | Description |  
| `vectors` | Array | An array containing the vectors to upsert. Recommended batch limit is 100 vectors.  
`id` (str) - The vector's unique id.  
`values` (\[float\]) - The vector data.  
`metadata` (object) - (Optional) Metadata for the vector. |  
| `namespace` | string | (Optional) The namespace name to upsert vectors. |

##### 

Vector

[](#vector)

Parameter

Type

Description

`id`

string

The vector's unique ID.

`values`

Array

Vector data.

`metadata`

object

(Optional) Metadata for the vector.

Returns:

*   `upsertedCount` : `int64` The number of vectors upserted.

Example:

JavaScript

`const upsertResponse = await index.upsert({   upsertRequest: {     vectors: [       {         id: "vec1",         values: [0.1, 0.2, 0.3, 0.4],         metadata: {           genre: "drama",         },       },       {         id: "vec2",         values: [0.1, 0.2, 0.3, 0.4],         metadata: {           genre: "comedy",         },       },     ],     namespace: "example-namespace",   }, });`

Updated about 2 months ago

* * *

*   [Table of Contents](#)
*   *   [Getting Started](#getting-started)
        *   [Installation](#installation)
        *   [Usage](#usage)
    *   [Reference](#reference)
        *   [init()](#init)
        *   [configureIndex()](#configureindex)
        *   [createCollection()](#createcollection)
        *   [createIndex()](#createindex)
        *   [deleteCollection()](#deletecollection)
        *   [Types](#types-4)
        *   [deleteIndex()](#deleteindex)
        *   [Types](#types-5)
        *   [describeCollection()](#describecollection)
        *   [describeIndex()](#describeindex)
        *   [listCollections](#listcollections)
        *   [listIndexes](#listindexes)
        *   [Index()](#index)
        *   [Index.delete1()](#indexdelete1)
        *   [Index.describeIndexStats()](#indexdescribeindexstats)
        *   [Index.fetch()](#indexfetch)
        *   [Index.query()](#indexquery)
        *   [Index.update()](#indexupdate)
        *   [Index.upsert()](#indexupsert)