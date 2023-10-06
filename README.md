<h2 class="code-line" data-line-start=2 data-line-end=3 ><a id="_Digital_Cow_Hut_Backend_Assignment__2"></a><em>Digital Cow Hut Backend Assignment</em></h2>
<p class="has-line-data" data-line-start="3" data-line-end="4">The main focus of this assignment is to implement error handling, CRUD operations, pagination and filtering, transactions (including a simple transaction without a payment gateway), and additional routes as necessary.</p>
<h2 class="code-line" data-line-start=5 data-line-end=6 ><a id="Technology_Stack_5"></a>Technology Stack:</h2>
<ul>
<li class="has-line-data" data-line-start="6" data-line-end="7">Use TypeScript as the programming language.</li>
<li class="has-line-data" data-line-start="7" data-line-end="8">Use Express.js as the web framework.</li>
<li class="has-line-data" data-line-start="8" data-line-end="10">Use Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB.</li>
</ul>
<h1 class="code-line" data-line-start=10 data-line-end=11 ><a id="API_end_Points_10"></a>API end Points</h1>
<p class="has-line-data" data-line-start="24" data-line-end="25">===================== Profile ========================</p>
<ul>
<li class="has-line-data" data-line-start="25" data-line-end="26">/api/v1/users/my-profile (GET)</li>
<li class="has-line-data" data-line-start="25" data-line-end="26">/api/v1/users/my-profile (patch)</li>
</ul>
<p class="has-line-data" data-line-start="24" data-line-end="25">===================== admins ========================</p>
<ul>
<li class="has-line-data" data-line-start="25" data-line-end="26">/api/v1/admins/create-admin (POST)</li>
<li class="has-line-data" data-line-start="25" data-line-end="26">/api/v1/admins/login (POST) (patch)</li>
</ul>
<p class="has-line-data" data-line-start="24" data-line-end="25">===================== users ========================</p>
<ul>
<li class="has-line-data" data-line-start="25" data-line-end="26">/api/v1/auth/signup (POST)</li>
<li class="has-line-data" data-line-start="25" data-line-end="26">/api/v1/auth/login (POST)</li>
<li class="has-line-data" data-line-start="25" data-line-end="26">/api/v1/auth/refresh-token (POST)</li>
<li class="has-line-data" data-line-start="26" data-line-end="27">/api/v1/users (Get alls)</li>
<li class="has-line-data" data-line-start="27" data-line-end="28">/api/v1/users/6516ac7e802242424008e7f5 (Get single)</li>
<li class="has-line-data" data-line-start="28" data-line-end="29">/api/v1/users/6516ac7e802242424008e7f5 (PATCH)</li>
<li class="has-line-data" data-line-start="29" data-line-end="31">/api/v1/users/6516ac7e802242424008e7f5 (DELETE)</li>
</ul>
<p class="has-line-data" data-line-start="11" data-line-end="12">===================== cows ========================</p>
<ul>
<li class="has-line-data" data-line-start="12" data-line-end="13">/api/v1/cows (POST)</li>
<li class="has-line-data" data-line-start="13" data-line-end="14">/api/v1/cows (Get alls)</li>
<li class="has-line-data" data-line-start="14" data-line-end="15">/api/v1/cows/6516ad3c802242424008e7fb (Get single)</li>
<li class="has-line-data" data-line-start="15" data-line-end="16">/api/v1/cows/6516ad3c802242424008e7fb (PATCH)</li>
<li class="has-line-data" data-line-start="16" data-line-end="17">/api/v1/cows/6516ad3c802242424008e7fb (DELETE)</li>
<li class="has-line-data" data-line-start="17" data-line-end="18">/api/v1/cows/?pag=1&amp;limit=10</li>
<li class="has-line-data" data-line-start="18" data-line-end="19">/api/v1/cows/?searchTerm=Dai</li>
<li class="has-line-data" data-line-start="19" data-line-end="20">/api/v1/cows/?sortBy=price&amp;sortOrder=asc</li>
<li class="has-line-data" data-line-start="20" data-line-end="21">/api/v1/cows/?minPrice=20000&amp;maxPrice=70000</li>
<li class="has-line-data" data-line-start="21" data-line-end="22">/api/v1/cows/?location=Chattogram</li>
<li class="has-line-data" data-line-start="22" data-line-end="24">/api/v1/cows/?searchTerm=Cha</li>
</ul>
<p class="has-line-data" data-line-start="31" data-line-end="32">==================== orders ========================&lt;</p>
<ul>
<li class="has-line-data" data-line-start="32" data-line-end="33">/api/v1/orders (POST)</li>
<li class="has-line-data" data-line-start="32" data-line-end="33">/api/v1/orders (GET)</li>
<li class="has-line-data" data-line-start="32" data-line-end="33">/api/v1/orders/:id (GET)</li>
</ul>
