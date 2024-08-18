import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./RecipeView.module.css";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Chip,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { RemoveFromCollection, AddToCollection } from "../../API/CollectionApi";
import CollectionRow from "../CollectionRow/CollectionRow";
import { UserContext } from "../UserContext/UserContext";
import { GetRecipe, AddComment, RemoveComment } from "../../API/RecipeApi";
import { useWakeLock } from "react-screen-wake-lock";
import EditIcon from "@mui/icons-material/Edit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as DOMPurify from "dompurify";
import {
  multiply_recipe,
  parseInputToFloat,
} from "../../utilities/multiplyRecipe";

export default function RecipeView() {
  const navigate = useNavigate();
  const { user, favorites } = useContext(UserContext);
  const { recipeId } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [scaledIngredients, setScaledIngredients] = useState([]);
  const { isSupported, released, request, release } = useWakeLock({
    onRequest: () => console.log(`Screen Wake Lock: requested!`),
    onError: () => console.log("An error happened"),
    onRelease: () => console.log(`Screen Wake Lock: released!`),
  });
  const [scaled, setScale] = useState(1);

  let displaySteps = recipe.steps?.map((steps) => {
    return <li>{steps}</li>;
  });
  let displayIngredients = recipe.ingredients?.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>;
  });
  const loadRecipe = async () => {
    setIsLoading(true);
    let data = await GetRecipe(recipeId);
    if (data) {
      setRecipe(data);
      setCollections(data.collections);
    }
    console.log(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!location.state) {
      loadRecipe();
    } else {
      setRecipe(location.state.recipe);
      setCollections(location.state.recipe.collections);
    }
    checkIfFavorited();
  }, []);
  useEffect(() => {
    if (recipe.comments) {
      setComments(recipe.comments.reverse());
    }
  }, [recipe]);
  useEffect(() => {
    checkIfFavorited();
  }, [favorites]);
  const checkIfFavorited = () => {
    if (favorites) {
      let value = favorites.includes(recipeId);
      setIsFavorited(value);
    }
  };
  if (isLoading) {
    return (
      <div className="content">
        <div className="twoColumn">
          <CircularProgress />
        </div>
      </div>
    );
  }
  const handleDelete = async (collectionId, name) => {
    let collectionObj = { collectionId, name };
    let recipeObj = { recipeId: recipe.recipeId, title: recipe.title };
    await RemoveFromCollection(recipeObj, collectionObj);
    collections.splice(
      collections.findIndex((c) => c.collectionId == collectionId),
      1
    );
    setCollections([...collections]);
  };
  const addCollection = async (collection) => {
    if (
      collections != null &&
      collections.find((col) => col.collectionId === collection.collectionId)
    ) {
      return;
    }
    let collectionObj = {
      collectionId: collection.collectionId,
      name: collection.name,
    };
    let recipeObj = { recipeId: recipe.recipeId, title: recipe.title };

    if (!collections) {
      setCollections([collection]);
    } else {
      setCollections([...collections, collectionObj]);
    }
    await AddToCollection(recipeObj, collectionObj);
  };

  let collectionList = collections?.map((collection) => {
    return (
      <Chip
        label={collection.name}
        onDelete={() => handleDelete(collection.collectionId)}
      />
    );
  });
  const saveComment = async () => {
    let cleanComment = DOMPurify.sanitize(comment);
    console.log(cleanComment);

    let commentObj = {
      comment: cleanComment,
      datetime: Date.now(),
      user,
    };
    let eventObj = {
      recipeId,
      comment: commentObj,
    };
    setComments([commentObj, ...comments]);
    setComment("");
    await AddComment(eventObj);
  };
  const displayComments = comments.map((comment) => {
    // console.log(comment);
    return (
      <div className={classes.commentContainer}>
        <div className={classes.commentName}>{comment.user.username}</div>
        <div
          className={classes.comment}
          dangerouslySetInnerHTML={{ __html: comment.comment }}
        />
        <div className={classes.commentDate}>
          {new Date(comment.datetime).toDateString()}
        </div>
      </div>
    );
  });
  let modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
    ],
  };

  let formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  let scale = (multiple) => {
    let newIngredients = recipe.ingredients.map((ingredient) => {
      let scaled = multiply_recipe(ingredient, multiple);
      return <li key={scaled}>{scaled}</li>;
    });
    setScaledIngredients([...newIngredients]);
  };
  let handleScaleInputChanged = (event) => {
    let value = event.target.value;

    if (value.length > 0) {
      setScale(event.target.value);
      let parsedValue = parseFloat(value);
      console.log(parsedValue);
      scale(parsedValue);
    } else {
      setScale(1);
      scale(1);
    }
  };
  let color = recipe.image?.color ?? "#FF9F2F";
  let style = { backgroundColor: color };
  let image = recipe.image?.icon ?? "seven.svg";
  let imagePath = `/images/${image}`;
  let recipeSource = recipe.source?.includes("http") ? (
    <Link to={recipe.source} target="_blank">
      Source
    </Link>
  ) : (
    <div className="source">{recipe.source}</div>
  );
  return (
    <div className="content">
      <div className="twoColumn">
        <div className={classes.image} style={style}>
          <img className={classes.img} src={imagePath} />
        </div>
        <div className="recipes">
          <div className={classes.titleRow}>
            <div className="recipeTitle">{recipe.title}</div>
            <div className={classes.actions}>
              {recipe.userId == user.userId ? (
                <Button onClick={() => navigate("edit", { state: { recipe } })}>
                  <EditIcon />
                </Button>
              ) : (
                <></>
              )}
              {/* <Button><img src="/download.png" /></Button> */}
              {isSupported ? (
                <Tooltip title="Keep Screen Awake">
                  <Switch
                    onChange={() =>
                      released === false ? release() : request()
                    }
                  />
                </Tooltip>
              ) : (
                <></>
              )}
              <FavoriteButton favorited={isFavorited} />
              <Link
                component="button"
                to="/create"
                state={{ recipe, variation: true, parentId: recipeId }}
                className="recipeLinkButton"
              >
                Add Variation
              </Link>
            </div>
          </div>
          <div className="leftAlign descriptionRow">{recipe.description}</div>
          <div>{recipeSource}</div>
          <div className={classes.collections}>
            {collectionList} <CollectionRow collectionAdded={addCollection} />
          </div>
          <div>
            <div className={classes.ingredientHeader}>
              <h2>Ingredients</h2>
              <div className={classes.ingredentScale}>
                <ButtonGroup variant="outlined" size="medium">
                  <Button
                    onClick={() => {
                      setScale(0.5);
                      scale(0.5);
                    }}
                    variant={scaled == 0.5 ? "contained" : "outlined"}
                  >
                    1/2x
                  </Button>
                  <Button
                    onClick={() => {
                      setScale(1);
                      scale(1);
                    }}
                    variant={scaled == 1 ? "contained" : "outlined"}
                  >
                    1x
                  </Button>
                  <Button
                    onClick={() => {
                      setScale(2);
                      scale(2);
                    }}
                    variant={scaled == 2 ? "contained" : "outlined"}
                  >
                    2x
                  </Button>
                  <TextField
                    size="small"
                    placeholder="Custom"
                    onChange={handleScaleInputChanged}
                  ></TextField>
                </ButtonGroup>
              </div>
            </div>
            <div>
              {scaledIngredients.length > 0 ? (
                <ul className={classes.list}>{scaledIngredients}</ul>
              ) : (
                <ul className={classes.list}>{displayIngredients}</ul>
              )}
            </div>
          </div>
          <div>
            <h2>Steps</h2>
            <ol className={classes.list}>{displaySteps}</ol>
          </div>
          {recipe.notes?.length > 0 ? (
            <div>
              <h2>Notes</h2>
              <div>{recipe.notes}</div>
            </div>
          ) : (
            <></>
          )}
          <div className={classes.comments}>
            <h2>Comments</h2>
            <div>
              <ReactQuill
                theme="snow"
                value={comment}
                modules={modules}
                formats={formats}
                onChange={setComment}
              />
              <Button variant="contained" onClick={saveComment}>
                Save
              </Button>
            </div>
            <div>{displayComments}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
