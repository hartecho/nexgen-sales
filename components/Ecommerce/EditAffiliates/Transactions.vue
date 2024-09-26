<template>
  <div class="section">
    <h2>Transactions</h2>
    <div v-if="localTransactions.length > 0">
      <div
        v-for="(transaction, index) in localTransactions"
        :key="index"
        class="transaction-wrapper"
      >
        <h3>Transaction {{ index + 1 }}</h3>
        <div class="input-wrapper">
          <input
            type="text"
            :value="transaction.invoiceNumber"
            @input="
              onTransactionChange(index, 'invoiceNumber', $event.target.value)
            "
            placeholder=" "
          />
          <label>Invoice Number</label>
        </div>
        <div class="input-wrapper">
          <input
            type="date"
            :value="transaction.date"
            @input="onTransactionChange(index, 'date', $event.target.value)"
            placeholder=" "
          />
          <label>Date</label>
        </div>
        <div class="input-wrapper">
          <input
            type="number"
            :value="transaction.totalCost"
            @input="
              onTransactionChange(index, 'totalCost', $event.target.value)
            "
            placeholder=" "
          />
          <label>Total Cost ($)</label>
        </div>
        <div class="input-wrapper">
          <textarea
            :value="transaction.itemizedList.join(', ')"
            @input="
              onTransactionChange(
                index,
                'itemizedList',
                $event.target.value.split(', ')
              )
            "
            placeholder=" "
          ></textarea>
          <label>Itemized List</label>
        </div>
        <button @click="removeTransaction(index)" class="remove-button">
          Remove Transaction
        </button>
      </div>
    </div>
    <button @click="addTransaction" class="action-button">
      Add Transaction
    </button>
  </div>
</template>
  
  <script setup>
import { ref, watch } from "vue";

const props = defineProps({
  selectedAffiliate: Object,
});

const emit = defineEmits(["update:transactions"]);

const localTransactions = ref([...props.selectedAffiliate.transactions]);

watch(localTransactions, (newVal) => {
  emit("update:transactions", newVal);
});

function addTransaction() {
  localTransactions.value.push({
    invoiceNumber: "",
    date: "",
    totalCost: 0,
    itemizedList: [],
  });
}

function removeTransaction(index) {
  localTransactions.value.splice(index, 1);
}

function onTransactionChange(index, field, value) {
  localTransactions.value[index][field] = value;
  emit("update:transactions", [...localTransactions.value]);
}
</script>
  
  <style scoped>
.section {
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

.transaction-wrapper {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-wrapper input[type="text"],
.input-wrapper input[type="number"],
.input-wrapper input[type="date"],
.input-wrapper textarea {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-wrapper input[type="text"]:focus,
.input-wrapper input[type="number"]:focus,
.input-wrapper input[type="date"]:focus,
.input-wrapper textarea:focus {
  border-color: #4caf50;
  outline: none;
}

.input-wrapper label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  background: #fff;
  padding: 0 5px;
  color: #999;
  pointer-events: none;
}

.input-wrapper input:focus + label,
.input-wrapper input:not(:placeholder-shown) + label,
.input-wrapper textarea:focus + label,
.input-wrapper textarea:not(:placeholder-shown) + label {
  top: -10px;
  left: 10px;
  font-size: 0.85rem;
  color: #4caf50;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  width: 100%;
  margin-top: 1rem;
}

.remove-button:hover {
  background-color: #c0392b;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;
}

.action-button:hover {
  background-color: #ff8210;
  color: white;
}
</style>
  