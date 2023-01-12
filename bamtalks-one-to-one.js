const handleRegex = /\/product\/(.[\w\d-+]+)/;
const WooCommerce = {};
// https://woocommerce.github.io/woocommerce-rest-api-docs/?shell#products
let PRODUCTS = {};
let isLoadingProducts = true;
let onLoadedCallbacks = [];
(async () => {
  let page = 1;
  try {
    while (isLoadingProducts && page < 5) {
      const products = await jQuery.getJSON(
        "https://vipdemo1.wpengine.com/wp-json/wc/v2/products/",
        {
          per_page: 50,
          page
        }
      );
      for (product of products) {
        PRODUCTS[product.id.toString()] = product;
        if (product.variations.length) {
          const variations = await jQuery.getJSON(
            `https://vipdemo1.wpengine.com/wp-json/wc/v2/products/${product.id.toString()}/variations/`,
            { per_page: 50 }
          );
          variations.forEach((variation) => {
            PRODUCTS[variation.id.toString()] = variation;
          });
        }
      }
      page++;
      isLoadingProducts = !!products.length;
    }
  } catch (e) {
    console.log(e);
    isLoadingProducts = false;
  }
  if (onLoadedCallbacks.length > 0) {
    for (const i in onLoadedCallbacks) {
      const cb = onLoadedCallbacks[i];
      try {
        cb();
      } catch (e) {
        console.error(e);
      }
    }
    onLoadedCallbacks = [];
  }
})();
WooCommerce.getProductByUrl = (url) => {
  return new Promise((resolve, reject) => {
    const matches = handleRegex.exec(url);
    if (!matches) return reject(new Error("Not a product url"));
    const id = matches[1];
    ensureLoadedProducts(() => {
      let product = PRODUCTS[id.toString()];
      const attributes = [];
      for (const attribute of product.attributes || []) {
        if (!attribute.variation) continue;
        const attributeValue = getParameterByName(
          `attribute_${attribute.name.toLowerCase()}`,
          url
        );
        if (attributeValue && attribute.options.includes(attributeValue)) {
          attributes.push({
            name: attribute.name,
            option: attributeValue
          });
        }
      }
      if (Object.keys(attributes).length && (product.variations || []).length) {
        for (const variationId of product.variations) {
          const variation = PRODUCTS[variationId];
          if (!variation) continue;
          const matchingAttributes = [];
          for (const attribute of attributes) {
            if (
              variation.attributes.find(
                (a) =>
                  a.name === attribute.name && a.option === attribute.option
              )
            ) {
              matchingAttributes.push(attribute.name);
            }
          }
          if (matchingAttributes.length === attributes.length) {
            product = variation;
            break;
          }
        }
      }
      return resolve(product);
    });
  });
  // return jQuery.getJSON("/wp-json/wc/v2/products/" + handle[1]);
};
WooCommerce.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    ensureLoadedProducts(() => {
      resolve(PRODUCTS[id.toString()]);
    });
  });
  // return jQuery.getJSON("/wp-json/wc/v2/products/" + id);
};
WooCommerce.getProductByEAN = (id) => {
  return new Promise((resolve, reject) => {
    ensureLoadedProducts(() => {
      const product = Object.keys(PRODUCTS)
        .map((key) => PRODUCTS[key])
        .find((product) => {
          if (!product.meta_data) return;
          const ean = product.meta_data.find(({ key }) => key === "_alg_ean");
          if (!ean) return;
          return ean.value === id.toString();
        });
      if (!product)
        reject(new Error("Failed to find a product matching provided EAN"));
      resolve(product);
    });
  });
};
WooCommerce.findProducts = (term) => {
  return new Promise((resolve, reject) => {
    ensureLoadedProducts(() => {
      let matchingProducts = Object.keys(PRODUCTS)
        .map((key) => PRODUCTS[key])
        .map(function (prod) {
          if (!prod.variations) return null;
          if (!!prod.sku && prod.sku.includes(term)) return prod;
          if (!!prod.name && prod.name.toLowerCase().includes(term))
            return prod;
          if (
            !!prod.description &&
            prod.description.toLowerCase().includes(term)
          )
            return prod;
          if (
            !!prod.shortDescription &&
            prod.shortDescription.toLowerCase().includes(term)
          )
            return prod;
          if (!!prod.permalink && prod.permalink.toLowerCase().includes(term))
            return prod;
          if (!!prod.categories) {
            for (let i = 0; i < prod.categories.length; i++) {
              if (prod.categories[i].name.includes(term)) return prod;
            }
          }
          if (!!prod.variations) {
            for (let i = 0; i < prod.variations.length; i++) {
              if (
                PRODUCTS[prod.variations[i]].sku.toLowerCase().includes(term)
              ) {
                return {
                  ...prod,
                  id: PRODUCTS[prod.variations[i]].id,
                  variant: { ...PRODUCTS[prod.variations[i]] }
                };
              }
              if (
                PRODUCTS[prod.variations[i]].permalink
                  .toLowerCase()
                  .includes(term)
              ) {
                return {
                  ...prod,
                  variant: { ...PRODUCTS[prod.variations[i]] }
                };
              }
            }
          }
          return null;
        });
      matchingProducts = matchingProducts.filter(function (product) {
        return product !== null;
      });
      resolve(matchingProducts);
    });
  });
};
function ensureLoadedProducts(cb) {
  if (isLoadingProducts) {
    onLoadedCallbacks.push(cb);
  } else {
    cb();
  }
}

var virtualCart = {}; // Needed since cocart gives generated keys on addToCart that needs to be referenced when updating items

var addToCart = (sku) => {
  // TODO: Implement your logic for adding a product variation to your native cart
  // e.g. fetch('/cart/add', { method: 'POST', body: JSON.stringify({ sku: sku, quantity: 1 }) });
  return Promise.resolve({
    success: true
  });
};

var updateItemInCart = (sku, quantity) => {
  // TODO: Implement your logic for updating your native cart
  // e.g. fetch('/cart/update', { method: 'POST', body: JSON.stringify({ sku: sku, quantity: quantity }) });
  return Promise.resolve({
    success: true
  });
};

var removeItemFromCart = (sku, quantity) => {
  // TODO: Implement your logic for removing the product from your native cart
  // e.g. fetch('/cart/remove', { method: 'POST', body: JSON.stringify({ sku: sku, quantity: 0 }) });
  return Promise.resolve({
    success: true
  });
};

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function onBambuserOneToOneReady() {
  // This method will be invoked when embed.js has loaded and Bambuser One-to-One API is available.
  // Creating an instance directly will allow to detect connect links that will automatically open the Live Meeting overlay on page load.
  let oneToOneEmbed = new BambuserOneToOneEmbed({
    withMinimizeSupport: true,
    orgId: "qxrmGWq47qegV9xiTUEl",
    queue: getParameterByName("queue") || "",
    triggers: ["smart", "manual", "connect-link"],
    smartVariantOverride: "Avatar",
    popupTimeoutSeconds: 2,
    enableScanning: true,
    data: {
      "Current page": window.location.href,
      firstName: "Jon",
      lastName: "Doe",
      email: "jon.doe@bambuser.com",
      Membership: "Premium",
      "Latest purchase": "08-25-2021"
    }
  });

  window.oneToOneEmbed = oneToOneEmbed; // Expose for testing purpose

  oneToOneEmbed.on("goto-checkout", function () {
    oneToOneEmbed.floatAbove("/book-a-demo");
  });

  window.updateBambuserConfig = function (config) {
    oneToOneEmbed.config = {
      ...oneToOneEmbed.config,
      ...config
    };
  };

  // Inside onBambuserOneToOneReady method!
  let updateProduct = function (
    refId,
    item,
    variations,
    defaultVariation,
    relatedProducts
  ) {
    let defaultVariationIndex = 0;
    if (!!variations && defaultVariation) {
      defaultVariationIndex = variations.findIndex(
        (variant) => `${variant.id}` === `${defaultVariation}`
      );
      if (defaultVariationIndex === -1) {
        defaultVariationIndex = 0;
      }
    }

    // Use the references provided above to fetch product details
    // from your product portfolio.
    // Provide product data to the player using the methods below.
    const attributes = item.attributes || [];
    const images = item.images || [];

    const stripHtml = (html) => {
      let tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    const pickDescription = (item) => {
      if (!!item.description && !!item.description.trim()) {
        return stripHtml(item.description);
      }
      return stripHtml(item.short_description);
    };

    const extractImage = (item) => {
      if (!item) return "";
      if (item.image && item.image.src) return item.image.src;
      if (item.images) {
        if (item.images[0]) return item.images[0].src;
      }
      return "";
    };

    const extractPriceObjectFromWooCommerceProduct = (price, product) => {
      const itemOnSale = !!product.sale_price;
      const currentPrice = product.sale_price || product.price;
      const originalPrice = itemOnSale ? product.regular_price : product.price;
      const currentPriceFloat =
        typeof currentPrice === "string"
          ? parseFloat(currentPrice)
          : currentPrice;
      const originalPriceFloat =
        typeof originalPrice === "string"
          ? parseFloat(originalPrice)
          : originalPrice;
      price.current(currentPriceFloat).original(originalPriceFloat);
    };

    oneToOneEmbed.updateProduct(refId, (factory) =>
      factory
        .currency("SEK")
        .locale("sv-SE")
        .product((p) =>
          p
            .name(item.name)
            .sku("" + item.id)
            .description(pickDescription(item))
            .url(item.permalink)
            .attributes((attribute) =>
              attributes.map((attr) =>
                attribute(attr.name)
                  .name(attr.name)
                  .options((option) =>
                    (attr.options || [attr.option]).map((optionName) =>
                      option(optionName).name(optionName)
                    )
                  )
              )
            )
            .defaultVariationIndex(defaultVariationIndex)
            .variations((variation) => {
              if (!variations || variations.length === 0) {
                return [
                  variation()
                    .name(item.name)
                    .inStock(item.stock_status === "instock")
                    .sku("" + item.id)
                    .imageUrls(images.map((img) => img.src))
                    .price((price) =>
                      extractPriceObjectFromWooCommerceProduct(price, item)
                    )
                    .url(item.permalink)
                    .attributes((attribute) =>
                      attributes.map((attr) =>
                        attribute(attr.name, attr.option || attr.options[0])
                      )
                    )
                    .relatedProducts((relatedProduct) =>
                      relatedProducts.map((related) =>
                        relatedProduct()
                          .title(related.name)
                          .sku("" + related.id)
                          .imageUrl(extractImage(related))
                          .price((price) => price.current(related.price))
                      )
                    )
                    .rating((ratingFactory) =>
                      ratingFactory
                        .maxValue(5)
                        .rating(4)
                        .numberOfRatings(
                          Math.floor(Math.random() * (130 - 4) + 4)
                        )
                    )
                    .details((detail) => [
                      (() => {
                        const usps = item.meta_data.find(
                          (m) => m.key === "uniqueSellingPoints"
                        )
                          ? item.meta_data
                              .find((m) => m.key === "uniqueSellingPoints")
                              .value.split("|")
                          : [];
                        return detail("BULLETS", usps);
                      })()
                    ])
                ];
              }
              return variations.map((variant) =>
                variation()
                  .name(item.name)
                  .sku("" + variant.id)
                  .inStock(variant.stock_status === "instock")
                  .imageUrls([
                    ...(variant.image.src ? [variant.image.src] : []),
                    ...(variant.woo_variation_gallery_images
                      ? variant.woo_variation_gallery_images.map(
                          (res) => res.src
                        )
                      : [])
                  ])
                  .price((price) =>
                    extractPriceObjectFromWooCommerceProduct(price, variant)
                  )
                  .url(variant.permalink)
                  .attributes((attribute) =>
                    variant.attributes.map((attr) =>
                      attribute(attr.name, attr.option)
                    )
                  )
                  .relatedProducts((relatedProduct) =>
                    relatedProducts.map((related) =>
                      relatedProduct()
                        .title(related.name)
                        .sku("" + related.id)
                        .imageUrl(extractImage(related))
                        .price((price) => price.current(related.price))
                    )
                  )
                  .rating((ratingFactory) =>
                    ratingFactory
                      .maxValue(5)
                      .rating(4)
                      .numberOfRatings(
                        Math.floor(Math.random() * (130 - 4) + 4)
                      )
                  )
                  .details((detail) => [
                    (() => {
                      const usps = item.meta_data.find(
                        (m) => m.key === "uniqueSellingPoints"
                      )
                        ? item.meta_data
                            .find((m) => m.key === "uniqueSellingPoints")
                            .value.split("|")
                        : [];
                      return detail("BULLETS", usps);
                    })()
                  ])
              );
            })
        )
    );
  };

  const provideDataFromSku = (sku) => {
    return new Promise((resolve, reject) => {
      WooCommerce.getProductById(sku)
        .then((item) => {
          const relatedPromises = (item.related_ids || []).map((id) => {
            return WooCommerce.getProductById(id);
          });
          Promise.all(relatedPromises).then((relatedResults) => {
            if (item._links && item._links.up && item._links.up[0]) {
              const parent_id = item._links.up[0].href.split("/").pop();
              provideDataFromSku(parent_id).then(resolve);
            } else if (item.variations.length > 0) {
              let variations = Object.values(PRODUCTS).filter((p) =>
                item.variations.includes(p.id)
              );
              resolve({
                product: item,
                variations,
                relatedProducts: relatedResults
              });
            } else if (item.parent_id !== 0) {
              // Try returning the parent item with this variation included instead of this specific variation
              provideDataFromSku(item.parent_id).then(resolve);
            } else {
              resolve({ product: item, relatedProducts: relatedResults });
            }
          });
        })
        .catch(reject);
    });
  };

  oneToOneEmbed.on("provide-search-data", function (
    searchRequest,
    searchResponse
  ) {
    let pagination = {};
    console.log(PRODUCTS);
    const resultsPerPage = 6;
    const { term, page } = searchRequest;
    setTimeout(function () {
      searchResponse(function (response) {
        return response
          .products(function (p) {
            let matchingProducts = Object.keys(PRODUCTS)
              .map((key) => PRODUCTS[key])
              .map(function (prod) {
                if (!prod.variations) return null;
                if (!!prod.sku && prod.sku.includes(term)) return prod;
                if (!!prod.name && prod.name.toLowerCase().includes(term))
                  return prod;
                if (
                  !!prod.description &&
                  prod.description.toLowerCase().includes(term)
                )
                  return prod;
                if (
                  !!prod.shortDescription &&
                  prod.shortDescription.toLowerCase().includes(term)
                )
                  return prod;
                if (
                  !!prod.permalink &&
                  prod.permalink.toLowerCase().includes(term)
                )
                  return prod;
                if (!!prod.categories) {
                  for (let i = 0; i < prod.categories.length; i++) {
                    if (prod.categories[i].name.includes(term)) return prod;
                  }
                }
                if (!!prod.variations) {
                  for (let i = 0; i < prod.variations.length; i++) {
                    if (
                      PRODUCTS[prod.variations[i]].sku
                        .toLowerCase()
                        .includes(term)
                    ) {
                      return {
                        ...prod,
                        id: PRODUCTS[prod.variations[i]].id,
                        variant: { ...PRODUCTS[prod.variations[i]] }
                      };
                    }
                    if (
                      PRODUCTS[prod.variations[i]].permalink
                        .toLowerCase()
                        .includes(term)
                    )
                      return {
                        ...prod,
                        variant: { ...PRODUCTS[prod.variations[i]] }
                      };
                  }
                }
                return null;
              });
            matchingProducts = matchingProducts.filter(function (product) {
              return product != null;
            });

            pagination.totalMatches = matchingProducts.length;
            pagination.totalPages = Math.ceil(
              pagination.totalMatches / resultsPerPage
            );
            matchingProducts = matchingProducts.splice(
              page * resultsPerPage,
              resultsPerPage
            );
            const results = matchingProducts.map(function (prod) {
              return p()
                .name(prod.name)
                .imageUrl(
                  !!prod.variant ? prod.variant.image.src : prod.images[0].src
                )
                .sku(!!prod.variant ? prod.variant.id : prod.id)
                .price(function (price) {
                  price
                    .current(
                      !!prod.variant
                        ? prod.variant.sale_price
                          ? prod.variant.sale_price
                          : prod.variant.price
                        : prod.sale_price
                        ? prod.sale_price
                        : prod.price
                    )
                    .original(
                      !!prod.variant
                        ? prod.variant.sale_price
                          ? prod.variant.regular_price
                          : null
                        : prod.sale_price
                        ? prod.regular_price
                        : null
                    );
                });
            });
            console.log(
              "matchingProducts",
              matchingProducts,
              "results",
              results
            );
            return results;
          })
          .pagination(function (p) {
            p.totalPages(pagination.totalPages)
              .totalMatches(pagination.totalMatches)
              .currentPageIndex(page);
          })
          .currency("SEK")
          .locale("sv-SE");
      });
    }, 1000);
  });

  oneToOneEmbed.on("provide-product-data", (request) => {
    request.products.forEach(
      ({ ref: sku, id: requestId, url: publicUrl, type }) => {
        if (sku && type === "scanned-code") {
          WooCommerce.getProductByEAN(sku)
            .then((item) => {
              return provideDataFromSku(item.id)
                .then(({ product, variations, relatedProducts }) => {
                  updateProduct(
                    requestId,
                    product,
                    variations,
                    item.id,
                    relatedProducts
                  );
                })
                .catch((error) => {
                  throw new Error("No such product available"); // throw an error where error.message is showed to the agent
                });
            })
            .catch((error) => {
              return window.oneToOneEmbed.updateProduct(requestId, () => {
                throw error; // throw an error where error.message is showed to the agent
              });
            });
        } else if (sku && !sku.startsWith("http")) {
          provideDataFromSku(sku)
            .then(({ product, variations, relatedProducts }) => {
              updateProduct(
                requestId,
                product,
                variations,
                sku,
                relatedProducts
              );
            })
            .catch((error) => {
              console.log(error);
              return window.oneToOneEmbed.updateProduct(requestId, () => {
                throw new Error("No such product available"); // throw an error where error.message is showed to the agent
              });
            });
        } else if (sku && sku.startsWith("http")) {
          WooCommerce.getProductByUrl(sku)
            .then((matchingProduct) => {
              return provideDataFromSku(matchingProduct.id).then(
                ({ product, variations, relatedProducts }) => {
                  updateProduct(
                    requestId,
                    product,
                    variations,
                    matchingProduct.id,
                    relatedProducts
                  );
                }
              );
            })
            .catch((error) => {
              console.log(error);
              return window.oneToOneEmbed.updateProduct(requestId, () => {
                throw new Error("No such product available"); // throw an error where error.message is showed to the agent
              });
            });
        } else if (publicUrl) {
          WooCommerce.getProductByUrl(publicUrl).done((item) =>
            updateProduct(requestId, item)
          );
        }
      }
    );
  });

  const updateErrorHandler = (callback) => (error) => {
    if (error.responseText) {
      let response = JSON.parse(error.responseText);
      callback({
        success: false,
        reason: "out-of-stock", // for now hardcode out-of-stock as it is the only error we handle on agent side
        message: response.message
      });
    } else {
      callback(false);
    }
  };

  oneToOneEmbed.on("should-add-item-to-cart", (addedItem, callback) => {
    addToCart(addedItem.sku)
      .then(() => callback(true))
      .catch((error) => {
        if (error.message === yourOutOfStockErrorMessage) {
          // Unsuccessful due to 'out of stock'!
          callback({
            success: false,
            reason: "out-of-stock"
          });
        } else {
          // Unsuccessful due to other problems
          callback(false);
        }
      });
  });
  oneToOneEmbed.on("should-update-item-in-cart", (updatedItem, callback) => {
    if (updatedItem.quantity > 0) {
      updateItemInCart({
        sku: updatedItem.sku,
        quantity: updatedItem.quantity
      })
        .then(() => {
          // cart update was successful
          callback(true);
        })
        .catch((error) => {
          if (error.message === yourOutOfStockErrorMessage) {
            // Unsuccessful due to 'out of stock'!
            callback({
              success: false,
              reason: "out-of-stock"
            });
          } else {
            // Unsuccessful due to other problems
            callback(false);
          }
        });
    }

    // user wants to remove the product from the cart
    if (updatedItem.quantity === 0) {
      removeItemFromCart(updatedItem.sku)
        .then(() => {
          // successfully deleted item
          callback(true);
        })
        .catch(() => {
          // failed to delete item
          callback(false);
        });
    }
  });

  // Connect CTA button to open Bambuser One-to-One overlay.
  button = document.querySelector("#start-one-to-one");
  if (!!button) {
    button.addEventListener("click", function () {
      oneToOneEmbed.show();
    });
  }
}
var scriptNode = document.createElement("script");
scriptNode["id"] = "bambuser-one-to-one";
scriptNode["src"] = "https://one-to-one.bambuser.com/embed.js";
document.body.appendChild(scriptNode);
